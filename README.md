# GeoJSON endpoints for Japanese administrations

```
https://geolonia.github.io/japanese-admins/<都道府県名>/<市区町村名>.json
```
※ 都道府県名及び市区町村名は URL エンコードを行ってください。


## ビルド方法

[「国土数値情報（行政区域データ）」（全国版）](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-v3_1.html)をダウンロードして、`data` ディレクトリに配置します。
以下のコマンドでダウンロードできます。

```
curl https://nlftp.mlit.go.jp/ksj/gml/data/N03/N03-2022/N03-20220101_GML.zip -o data/N03-20220101_GML.zip --create-dirs
unzip data/N03-20220101_GML.zip -d data
```

以下のコマンドで、`docs` ディレクトリに JSON ファイルが生成されます。

```
$ npm install
$ npm run build
```

## 備考

* [「国土数値情報（行政区域データ）」（国土交通省）](https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-v3_1.html)を加工して作成
* 政令指定都市は、区単位に分割してJSONファイルを作成しています。そのため JSON ファイルの数は、市区町村数（政令市、市、特別区、区、町、村） - 政令市数 となります。
