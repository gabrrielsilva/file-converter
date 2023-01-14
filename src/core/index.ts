import { exec, ExecException } from 'node:child_process';

const fileFormatsWithExtension = {
  'BAG': 'bag',
  'FITS': 'fit',
  'netCDF': 'nc',
  'PCIDSK': 'pix',
  'PDS4': 'xml',
  'VICAR': 'vicar',
  'JP2OpenJPEG': null, 
  'PDF': 'pdf',
  'MBTiles': 'mbtiles',
  'EEDA': null,
  'OGCAPI': null,
  'ESRI Shapefile': 'shp',
  'MapInfo File': null, 
  'UK .NTF': null,
  'LVBAG': null,
  'OGR_SDTS': null,
  'S57': '000',
  'DGN': 'dgn',
  'OGR_VRT': null,
  'Memory': null, 
  'CSV': 'csv',
  'NAS': 'nas',
  'GML': 'gml',
  'GPX': 'gpx',
  'LIBKML': null,
  'KML': 'kml', 
  'GeoJSON': 'geojson', 
  'GeoJSONSeq': null,
  'ESRIJSON': null, 
  'TopoJSON': 'topojson', 
  'Interlis 1': null, 
  'Interlis 2': null,
  'OGR_GMT': null,
  'GPKG': null,
  'SQLite': null,
  'ODBC': null,
  'WAsP': null,
  'PGeo': null,
  'MSSQLSpatial': null,
  'OGR_OGDI': null,
  'PostgreSQL': null,
  'MySQL': null,
  'OpenFileGDB': null,
  'DXF': 'dxf',
  'CAD': 'cad',
  'FlatGeobuf': null,
  'Geoconcept': null,
  'GeoRSS': null,
  'VFK': 'vfk',
  'PGDUMP': null,
  'OSM': 'osm',
  'GPSBabel': null,
  'OGR_PDS': null,
  'WFS': 'wfs',
  'OAPIF': null,
  'EDIGEO': null,
  'SVG': 'svg',
  'Idrisi': null,
  'ODS': 'ods',
  'XLSX': 'xlsx',
  'Elasticsearch': null,
  'Carto': null,
  'SXF': 'sxf',
  'Selafin': null,
  'JML': 'jml',
  'PLSCENES': null,
  'CSW': 'csw',
  'VDV': 'vdv',
  'GMLAS': null,
  'MVT': 'mvt',
  'NGW': 'ngw',
  'MapML': null,
  'TIGER': null,
  'AVCBin': null,
  'AVCE00': null,
  'HTTP': null
};

export function convertFile(inputFilePath: string, outputFilePath: string) {
  const fileFormats = Object.keys(fileFormatsWithExtension);
  const outputFileExtension = outputFilePath.split('.')[1];
  const outputFileType = fileFormats.find((format) => fileFormatsWithExtension[format] === outputFileExtension);
   
  try {
    exec(`ogr2ogr -f ${outputFileType} "${outputFilePath}" "${inputFilePath}"`, (error: ExecException, stdout: string, stderr: string) => {
      if (error) throw new Error(error.message);
      if (stderr) return { success: true, exceptions: stderr };
    });
  } catch (e) {
    return { success: false, exceptions: e }
  }
}
