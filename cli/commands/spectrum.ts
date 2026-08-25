import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { XMLParser } from 'fast-xml-parser';
import { ROOT } from '../lib/paths.ts';
import type { CollectionSpectrumData } from '../../src/types/collection/spectrum.ts';

interface RadiacodeResultData {
  DeviceConfigReference?: { Name?: string };
  StartTime?: string | number;
  EndTime?: string | number;
  EnergySpectrum?: {
    SpectrumName?: string;
    SerialNumber?: string;
    MeasurementTime?: number;
    EnergyCalibration?: { Coefficients?: { Coefficient?: number[] } };
    Spectrum?: { DataPoint?: number[] };
  };
}

interface RadiacodeDocument {
  ResultDataFile?: {
    ResultDataList?: {
      ResultData?: RadiacodeResultData[];
    };
  };
}

const xmlParser = new XMLParser({
  isArray: (name) => ['DataPoint', 'Coefficient', 'ResultData'].includes(name),
});

function parseSpectrum(xml: string, outputId: string): CollectionSpectrumData {
  const doc = xmlParser.parse(xml) as RadiacodeDocument;
  const resultData = doc.ResultDataFile?.ResultDataList?.ResultData?.[0];
  const energySpectrum = resultData?.EnergySpectrum;
  if (!resultData || !energySpectrum) {
    throw new Error('Invalid RadiaCode spectrum XML: missing ResultData/EnergySpectrum');
  }

  const coefficients = energySpectrum.EnergyCalibration?.Coefficients?.Coefficient ?? [];
  if (coefficients.length !== 3) {
    throw new Error(`Expected a 3-coefficient (quadratic) energy calibration, got ${coefficients.length}`);
  }
  const counts = energySpectrum.Spectrum?.DataPoint ?? [];

  return {
    id: outputId,
    device: resultData.DeviceConfigReference?.Name ?? 'RadiaCode-102',
    sample: energySpectrum.SpectrumName ?? '',
    serialNumber: energySpectrum.SerialNumber ?? '',
    measurementTimeSec: Number(energySpectrum.MeasurementTime) || 0,
    startTime: String(resultData.StartTime ?? ''),
    endTime: String(resultData.EndTime ?? ''),
    channels: counts.length,
    calibration: [coefficients[0], coefficients[1], coefficients[2]],
    counts,
  };
}

export function convertSpectrum(inputPath: string, outputId: string): void {
  const xml = readFileSync(resolve(inputPath), 'utf8');
  const spectrum = parseSpectrum(xml, outputId);

  const outDir = resolve(ROOT, 'src/data/spectra');
  const publicDir = resolve(ROOT, 'public/collection-spectra');
  mkdirSync(outDir, { recursive: true });
  mkdirSync(publicDir, { recursive: true });

  const outPath = resolve(outDir, `${outputId}.json`);
  const publicXmlPath = resolve(publicDir, `${outputId}.xml`);
  writeFileSync(outPath, `${JSON.stringify(spectrum)}\n`);
  writeFileSync(publicXmlPath, xml);

  console.log(`Wrote ${outPath} (${spectrum.channels} channels)`);
  console.log(`Wrote ${publicXmlPath}`);
}
