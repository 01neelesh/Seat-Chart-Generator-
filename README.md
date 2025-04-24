# 🪑 Exam Seating Chart Generator

<div align="center">
  <img src="public/logo512.png" alt="Exam Seating Chart Generator Logo" width="180"/>
  <br/>
  <br/>

  ![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)
  ![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
  ![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge)

  <h3>Create professional exam seating charts with ease</h3>
</div>

<p align="center">
  <img src="docs/preview.gif" alt="App Preview" width="80%"/>
</p>

## ✨ Features

- **📊 Easy Layout Creation** - Import room layouts from Excel or create them manually
- **👨‍🎓 Student Management** - Upload your student data using Excel spreadsheets
- **🔄 Multiple Allocation Methods** - Sort by roll number or alphabetically
- **👁️ Live Preview** - See your seating arrangement before generating
- **🖨️ PDF Export** - Generate professional printable seating charts
- **⚡ Responsive Design** - Works on desktop, tablet, and mobile devices
- **📱 Offline Support** - Generate PDFs even without internet connection

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ and npm/yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/exam-seating-chart-generator.git
   cd exam-seating-chart-generator
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. Start the development server
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## 📝 Usage

### Creating a Seating Chart

1. **Upload Student Data** - Import an Excel file with student information (name, roll number, and class)
2. **Configure Room Layout** - Either upload a room matrix Excel file or manually set up rows and columns
3. **Choose Allocation Method** - Select whether to arrange students by roll number or alphabetically
4. **Preview Layout** - Check how students will be seated before generating the final chart
5. **Generate PDF** - Create a professional PDF document ready for printing

### Excel Template Format

#### Students Excel Template (students.xlsx)

| Roll No | Name       | Class    |
|---------|------------|----------|
| 12345   | John Doe   | Class 10A|
| 67890   | Jane Smith | Class 10B|

#### Room Matrix Template (roomMatrix.xlsx)

| Room No | Rows | Columns | Total Capacity | Students per Seat |
|---------|------|---------|----------------|-------------------|
| 101     | 5    | 5       | 25             | 1                 |
| 102     | 6    | 8       | 48             | 2                 |

## 🔧 Technical Details

### Built With

- **Frontend:** React, Tailwind CSS, Lucide Icons
- **PDF Generation:** Server-side processing with custom templates
- **Excel Handling:** Custom parser for Excel files
- **State Management:** React hooks for local state

### Architecture

The application follows a clean, component-based architecture:

```
src/
├── components/         # UI components
├── services/           # API and service functions
├── hooks/              # Custom React hooks
├── utils/              # Helper functions
└── assets/             # Static assets
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons

---

<div align="center">
  Made with ❤️ by <a href="https://linkedin.com/in/your-profile">Your Name</a>
</div>