Module.register("MMM-PrayerTimes", {
    defaults: {
      address: "Dhaka,Bangladesh",
      method: 8,
      updateInterval: 60 * 60 * 1000,
      timeFormat: 12,
      ignoreList: []
    },
  
    start: function () {
      this.prayerTimesToday = null;
      this.prayerTimesTomorrow = null;
      this.getPrayerTimes();
      this.scheduleUpdate();
    },
  
    getPrayerTimes: function () {
      const urlToday = `https://api.aladhan.com/v1/timingsByAddress?address=${this.config.address}&method=${this.config.method}`;
      const urlTomorrow = `https://api.aladhan.com/v1/timingsByAddress?address=${this.config.address}&method=${this.config.method}&date=tomorrow`;
  
      fetch(urlToday)
        .then(res => res.json())
        .then(data => {
          if (data?.data?.timings) {
            this.prayerTimesToday = data.data.timings;
            this.updateDom();
          }
        });
  
      fetch(urlTomorrow)
        .then(res => res.json())
        .then(data => {
          if (data?.data?.timings) {
            this.prayerTimesTomorrow = data.data.timings;
            this.updateDom();
          }
        });
    },
  
    scheduleUpdate: function () {
      setInterval(() => {
        this.getPrayerTimes();
      }, this.config.updateInterval);
    },
  
    convertTime: function (timeStr) {
      if (this.config.timeFormat === 24) return timeStr;
      const [hour, minute] = timeStr.split(":").map(Number);
      const suffix = hour >= 12 ? "PM" : "AM";
      const hour12 = ((hour + 11) % 12 + 1);
      return `${hour12}:${minute.toString().padStart(2, '0')} ${suffix}`;
    },
  
    getDom: function () {
      const wrapper = document.createElement("div");
      wrapper.className = "prayer-times";
  
      if (!this.prayerTimesToday || !this.prayerTimesTomorrow) {
        const loading = document.createElement("div");
        loading.className = "loading";
        loading.innerText = "Loading prayer times...";
        wrapper.appendChild(loading);
        return wrapper;
      }
  
      const table = document.createElement("table");
      table.className = "prayer-times-table";
  
      const header = document.createElement("tr");
      ["Prayer", "Today", "Tomorrow"].forEach(text => {
        const th = document.createElement("th");
        th.innerText = text;
        header.appendChild(th);
      });
      table.appendChild(header);
  
      Object.keys(this.prayerTimesToday).forEach(name => {
        if (this.config.ignoreList.includes(name)) return;
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.innerText = name;
        const todayCell = document.createElement("td");
        todayCell.innerText = this.convertTime(this.prayerTimesToday[name]);
        const tomorrowCell = document.createElement("td");
        tomorrowCell.innerText = this.convertTime(this.prayerTimesTomorrow[name]);
        row.appendChild(nameCell);
        row.appendChild(todayCell);
        row.appendChild(tomorrowCell);
        table.appendChild(row);
      });
  
      wrapper.appendChild(table);
      return wrapper;
    },
  
    getStyles: function () {
      return ["MMM-PrayerTimes.css"];
    }
  });