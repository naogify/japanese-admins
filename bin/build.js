#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const JSONStream = require('JSONStream');

const file = path.join(path.dirname(path.dirname(__filename)), '/data/N03-22_220101.geojson')
const stream = fs.createReadStream(file);
const parser = JSONStream.parse('features.*');
const turf = require('@turf/turf')

const data = {}

stream.pipe(parser)
  .on('data', function (feature) {
    try {

      const prefName = feature.properties.N03_001
      const cityName = `${feature.properties.N03_003 || ''}${feature.properties.N03_004 || ''}`

      if (!cityName) {
        return
      }

      if (!data[prefName]) {
        data[prefName] = {}
      }

      if (!data[prefName][cityName]) {
        data[prefName][cityName] = {
          features: []
        }
      }

      const bbox = turf.bbox(feature);

      data[prefName][cityName].features.push({
        type: 'Feature',
        properties: { prefName, cityName, bbox },
        geometry: feature.geometry
      })
    } catch (e) {
    }
  })
  .on('end', function () {

    for (const pref in data) {
      const dir = path.join(path.dirname(path.dirname(__filename)), 'docs', pref)
      fs.mkdirSync(dir, { recursive: true })
      for (const admin in data[pref]) {
        const file = path.join(path.dirname(path.dirname(__filename)), 'docs', pref, `${admin}.json`)
        const newjson = {
          type: "FeatureCollection",
          features: data[pref][admin].features
        }

        fs.writeFileSync(file, JSON.stringify(newjson))
      }
    }
  });
