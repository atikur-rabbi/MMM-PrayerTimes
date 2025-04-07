# MMM-PrayerTimes

MMM-PrayerTimes is a MagicMirror² module that displays Islamic prayer times for a specified location. It is designed to integrate seamlessly with your MagicMirror setup, providing accurate and customizable prayer time information.

## Features
- Displays daily prayer times: Fajr, Dhuhr, Asr, Maghrib, and Isha.
- Fully customizable appearance.

## Installation
1. Navigate to your MagicMirror `modules` directory:
    ```bash
    cd ~/MagicMirror/modules
    ```
2. Clone the repository:
    ```bash
    git clone https://github.com/atikur-rabbi/MMM-PrayerTimes.git
    ```
3. Navigate to the module folder:
    ```bash
    cd MMM-PrayerTimes
    ```
4. Install dependencies:
    ```bash
    npm install
    ```

## Configuration
Add the following configuration to your `config.js` file:
```javascript
{
        module: "MMM-PrayerTimes",
        position: "bottom_left", // or wherever you want
        config: {
            address: "Dhaka,Bangladesh",
            method: 8,
            updateInterval: 60 * 60 * 1000,
            timeFormat: 12,
            ignoreList: ["Midnight", "Firstthird", "Lastthird"]
        }
          
}
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
Special thanks to the MagicMirror² community and contributors for their support and inspiration.