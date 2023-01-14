export interface ConvertFileAPI {
  convertFile: (inputFilePath: string, outputFilePath: string) => Promise<{
    success: boolean;
    exceptions: any;
  }>
}

declare global {
  interface Window {
    convertFileAPI: ConvertFileAPI; 
  }
}