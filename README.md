# Picha Lite
A simple, zero-dependency tool to compress and resize images right in the browser before they are uploaded.

## About The Project
Uploading high-resolution photos (5MB+) directly from a phone camera creates a bad user experience—it's slow, eats up mobile data, and wastes server storage.

This project solves that by using the browser's native capabilities to:
1. Resize huge images to a reasonable standard (Max width: 1080px).
2. Convert files to WebP format (lighter and modern).
3. Compress the file size by 90%+ without noticeable quality loss.

It’s built with Vanilla JavaScript—no frameworks, no build steps, just code.

## Features
- **Instant Feedback:** See the "Before" vs. "After" file size immediately.
- **Bandwidth Saver:** Visualizes exactly how much data you are saving (often >90%).
- **Privacy Friendly:** Processing happens entirely on the client-side (in the browser). The image never leaves the device until you decide to upload it.
- **Lightweight:** No external libraries or heavy node_modules.

## How to Run
This is a static project. You don't need to install anything.
1. **Clone the repo:**
```sh
git clone https://github.com/your-username/client-side-image-optimizer.git
```
2. **Open it:** Simply double-click `index.html` to open it in your browser.
3. **Test it:** Drop a large image file into the box and watch the compression happen.

## Contributing
This is a simple, lightweight project, and contributions are very welcome!
If you have ideas to make it better, please:
1. Open an Issue: Found a bug or have a suggestion? Let's discuss it.
2. Submit a PR: Fork the repo, make your changes, and submit a Pull Request.

## License
Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.