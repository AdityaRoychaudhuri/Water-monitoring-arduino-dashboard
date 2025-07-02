# Water-monitoring-arduino-dashboard
A real-time water quality monitoring dashboard built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. This application helps visualize and log live sensor data related to water quality, including **pH**, **Turbidity**, and **TDS (Total Dissolved Solids)** values.

---

## 🚀 Features

- **Dashboard Landing Page**
  - Overview chart showing recent sensor trends.
  - Real-time **log table** displaying all sensor readings with timestamps.

- **Individual Parameter Pages**
  - **pH Monitoring Page**: Detailed graph of pH sensor data.
  - **Turbidity Monitoring Page**: Graph showing turbidity levels over time.
  - **TDS Monitoring Page**: Graph displaying total dissolved solids data.

- **Real-time Data Fetching**
  - Pulls latest sensor data from the backend API.
  - Automatically updates UI using polling or WebSockets (based on implementation).

- **Responsive UI**
  - Built with modern UI practices and fully responsive for desktop and mobile views.

---

## 🛠️ Tech Stack

### 🔗 [Frontend](https://github.com/AdityaRoychaudhuri/Water-monitoring-arduino-dashboard/tree/main/client)
- React.js
- Redux Toolkit Query (RTK Query)
- Nivo Charts (for graphs)

### 🔗 [Backend](https://github.com/AdityaRoychaudhuri/Water-monitoring-arduino-dashboard/tree/main/server)
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Dotenv (for environment config)
- CORS enabled API

---

