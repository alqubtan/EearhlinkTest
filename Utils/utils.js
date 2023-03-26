export const speechToText = (audioStream) => {
  return new Promise((resolve, reject) => {
    const model = new Model("model-en-us-0.15");
    const spkModel = new SpkModel("model-en-us-0.15-spk");
    const recognizer = new KaldiRecognizer(model, spkModel, 16000);
    const reader = new wav.Reader();

    reader.on("format", ({ audioFormat, sampleRate, channels }) => {
      if (audioFormat !== 1) {
        reject(new Error("Unsupported audio format"));
        return;
      }

      recognizer.SetWords(true);

      reader.on("data", (data) => {
        const buffer = new Int16Array(data);

        recognizer.AcceptWaveform(buffer);

        const result = recognizer.Result();
        const words = JSON.parse(result).result;

        if (words && words.length > 0) {
          resolve(words[0].word);
        }
      });

      reader.on("end", () => {
        recognizer.FinalResult();
      });
    });

    audioStream.pipe(reader);
  });
};
