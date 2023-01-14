import { ipcMain } from 'electron';
import { convertFile } from '../core';

type Input = {
  inputFilePath: string,
  outputFilePath: string
}

ipcMain.handle('convertFile', async (_, input: Input) => {
  const { inputFilePath, outputFilePath } = input;
  const output = convertFile(inputFilePath, outputFilePath);
  
  return output;
})