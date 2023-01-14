import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('convertFileAPI', {
  convertFile: (inputFilePath: string, outputFilePath: string) => ipcRenderer.invoke('convertFile', { inputFilePath, outputFilePath }),
});
