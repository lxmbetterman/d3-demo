https://www.cnblogs.com/xiaoxu-xmy/p/13792515.html

## 2. TopoJSON

TopoJSON是GeoJSON按拓扑学编码后的拓展形式，是由D3的作者Mike Bostock制定的。相比GeoJSON直接使用Polygon、Point之类的几何体表示图形的方法，TopoJSON中的每一个几何体都是通过将共享边（被称为arcs）整合后组成的。

TopoJSON消除了冗余，文件大小缩小了80%，因为：

- 边界线只记录一次（例如广西和广东的交界线只记录一次）；
- 地理坐标使用整数，不使用浮点数。

## 1. GeoJSON

GeoJSON 是用于描述地理空间信息的数据格式。GeoJSON 不是一种新的格式，其语法规则是符合 JSON 格式的，只不过对其名称进行了规范，专门用于表示地理信息。

GeoJSON 的最外层是一个单独的对象（object）。这个对象可表示：

- 几何体(Geometry)。
- 特征(Feature)。
- 特征集合(FeatureCollection)。

最外层的GeoJSON里可能包含有很多子对象，每一个GeoJSON对象都有一个type属性，表示对象的类型，type的指必须是下面之一：

- Point：点。
- MultiPoint：多点。
- LineString：线。
- MultiLineString：多线。
- Polygon：面。
- MultiPolygon：多面。
- GeometryCollection：几何体集合。
- Feature：特征。
- FeatureCollection：特征集合

## 3. 在线工具

- JSON在线解析及格式化：https://www.json.cn/
- 在线生成GeoJSON: http://geojson.io/
- 简化、转换GeoJSON和TopoJSON： http://mapshaper.org/