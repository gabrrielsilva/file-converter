import React, { useState } from 'react';
import { useForm } from "react-hook-form";

window.React = React;

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

function App() {
  const { register, handleSubmit: onSubmit } = useForm();
  const [outputFormat, setOutputFormat] = useState<keyof typeof fileFormatsWithExtension>(null);
  const [result, setResult] = useState<{ success: boolean; exceptions: any }>(null);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setOutputFormat(e.target.value as keyof typeof fileFormatsWithExtension);

  const handleSubmit = async ({ inputFile, outputFormat }: { inputFile: FileList, outputFormat: keyof typeof fileFormatsWithExtension }) => {    
    const inputFilePath = inputFile[0].path;
    const outputPath = inputFilePath.split('.')[0]; // remove old extension
    const outputFilePath = outputPath + '.' + fileFormatsWithExtension[outputFormat]; // add new extension
    const result = await window.convertFileAPI.convertFile(inputFilePath, outputFilePath);
    setResult(result)
  }

  return (
    <div>
      <h1>File converter</h1>
      <form onSubmit={onSubmit(handleSubmit)}>
        <input type="file" {...register('inputFile')} />
        <select value={outputFormat} onChange={handleChange} {...register('outputFormat')}>
          {Object.keys(fileFormatsWithExtension).map(format => (
            <option disabled={!fileFormatsWithExtension[format]} value={format}>{format}</option>
          ))}
        </select>
        <button type='submit'>Converter</button>
      </form>
      {result && result?.success ? (
        <>
          <h1>Arquivo convertido com sucesso</h1>
          <p>{result?.exceptions}</p>
        </>
      ) : (
        <>
          <h1>Falha na conversão</h1>
          <p>{result?.exceptions}</p>
        </>
      )}
    </div>
  )
}

export default App;