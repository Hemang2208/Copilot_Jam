// Extend the Window interface to include tf and tmImage
declare global {
  interface Window {
    tf?: any;
    tmImage?: any;
  }
}

// Utility to dynamically load Teachable Machine's tmImage library
export async function loadTmImage() {
  // Load TensorFlow.js if not present
  if (!window.tf) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.21.0/dist/tf.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }
  // Load Teachable Machine image library if not present
  if (!window.tmImage) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8.4/dist/teachablemachine-image.min.js';
      script.onload = () => {
        // Wait until window.tmImage is defined
        const checkTmImage = () => {
          if (window.tmImage) {
            resolve();
          } else {
            setTimeout(checkTmImage, 50);
          }
        };
        checkTmImage();
      };
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }
  return window.tmImage;
}
