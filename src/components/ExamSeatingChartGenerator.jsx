import { useState, useCallback, useEffect } from 'react';
import { CheckCircle, X, AlertTriangle, FileSpreadsheet, Upload, Download, Eye, Trash2, Settings } from 'lucide-react';

// Background component with animated shapes
const Background = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-200/30 animate-pulse"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// File dropzone component
const FileDropZone = ({ accept, onChange, className, file, label, placeholder, infoText, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.xlsx')) {
        onChange({ target: { files: [droppedFile] } });
      }
    }
  }, [onChange]);

  return (
    <div className="space-y-1">
      <label className="block text-gray-700 text-sm font-medium">{label}</label>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          border-2 rounded-lg p-4 transition-all duration-300 cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50'}
          ${file ? 'bg-blue-50' : 'bg-white'}
          ${className}
        `}
      >
        <input
          type="file"
          onChange={onChange}
          className="hidden"
          id={`file-upload-${label}`}
          accept={accept}
        />
        <label
          htmlFor={`file-upload-${label}`}
          className="flex flex-col items-center cursor-pointer"
        >
          {file ? (
            <div className="flex items-center space-x-3 w-full">
              <FileSpreadsheet className="h-6 w-6 text-green-500" />
              <span className="text-sm text-gray-800 font-medium truncate flex-1">{file.name}</span>
              <div className="flex items-center">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Ready
                </span>
                {onClear && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-blue-500 mb-2 animate-bounce" style={{ animationDuration: '2s' }} />
              <p className="text-sm text-center text-gray-600 font-medium">{placeholder}</p>
              <p className="text-xs text-center text-gray-500 mt-1">Drag & drop or click to browse</p>
            </div>
          )}
        </label>
      </div>
      {infoText && <p className="text-xs text-gray-500">{infoText}</p>}
    </div>
  );
};

// Alert component for messages
const Alert = ({ type, message, onClose, action }) => {
  if (!message) return null;

  const types = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-700',
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      text: 'text-green-700',
      icon: <CheckCircle className="h-5 w-5 text-green-500" />
    }
  };

  const style = types[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-md p-3 mb-4 transition-all animate-fadeIn`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {style.icon}
          <span className={`ml-2 ${style.text}`}>{message}</span>
        </div>
        <div className="flex items-center">
          {action && action}
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, type = "text", value, onChange, min, max, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};

// Button component with loading state
const Button = ({ children, loading, disabled, primary = false, onClick, className = "" }) => {
  const baseClasses = "flex items-center justify-center py-2 px-4 rounded font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primaryClasses = primary
    ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
    : "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500";
  const disabledClasses = "bg-gray-300 cursor-not-allowed text-gray-500";

  return (
    <button
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${baseClasses} 
        ${loading || disabled ? disabledClasses : primaryClasses}
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

// Preview Grid component with responsive columns
const PreviewGrid = ({ previewData }) => {
  if (!previewData || !previewData.grid || !previewData.dimensions) return null;

  const { grid, dimensions } = previewData;
  const { rows, columns } = dimensions;

  // Calculate appropriate grid columns for display
  const gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;

  return (
    <div className="mt-4 border rounded-md p-4 bg-gray-50 animate-fadeIn">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Room Layout Preview</h3>
        <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          {rows} rows × {columns} columns
        </div>
      </div>

      <div className="overflow-auto max-h-64 border rounded bg-white p-1">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns }}
        >
          {grid.map((seat, index) => (
            <div
              key={index}
              className={`
                border p-2 text-center text-xs flex items-center justify-center 
                ${seat === 'X' ? 'bg-gray-200' : 'bg-blue-50 border-blue-200'}
                transition-all hover:bg-blue-100
              `}
              style={{ minHeight: '32px', minWidth: '32px' }}
            >
              {seat === 'X' ? 'X' : seat || ' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main component
export default function ExamSeatingChartGenerator() {
  const [studentsFile, setStudentsFile] = useState(null);
  const [roomMatrixFile, setRoomMatrixFile] = useState(null);
  const [allocationType, setAllocationType] = useState('roll');
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [useManualConfig, setUseManualConfig] = useState(false);

  // Manual configuration states
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);
  const [studentsPerSeat, setStudentsPerSeat] = useState(1);

  useEffect(() => {
    // Use this effect to set first render to false after mounting
    setIsFirstRender(false);
  }, []);

  const handleStudentsFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.xlsx')) {
        setError('Please upload a valid Excel (.xlsx) file for students data');
        setStudentsFile(null);
        return;
      }
      setStudentsFile(selectedFile);
      setError(null);
    }
  };

  const handleRoomMatrixFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.xlsx')) {
        setError('Please upload a valid Excel (.xlsx) file for room matrix');
        setRoomMatrixFile(null);
        return;
      }
      setRoomMatrixFile(selectedFile);
      setError(null);
    }
  };

  const clearFile = (fileType) => {
    if (fileType === 'students') {
      setStudentsFile(null);
    } else if (fileType === 'roomMatrix') {
      setRoomMatrixFile(null);
      setPreviewData(null);
    }
  };

  const handlePreviewClick = async (e) => {
    e.preventDefault();

    if (!useManualConfig && !roomMatrixFile) {
      setError('Please select a room matrix Excel file to preview or use manual configuration');
      return;
    }

    if (!useManualConfig && !roomMatrixFile) {
      setError('Please select a room matrix Excel file to preview');
      return;
    }

    setPreviewLoading(true);
    setError(null);
    setPreviewData(null);

    const formData = new FormData();

    if (useManualConfig) {
      formData.append('manualConfig', 'true');
      formData.append('rows', rows);
      formData.append('columns', columns);
      formData.append('studentsPerSeat', studentsPerSeat);

      // Still need to add a dummy roomMatrixFile for API validation
      // This will be a temporary solution until you modify your backend
      if (!roomMatrixFile) {
        // Create a tiny Excel file blob
        const blob = new Blob([""], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        formData.append('roomMatrixFile', blob, "dummy.xlsx");
      } else {
        formData.append('roomMatrixFile', roomMatrixFile);
      }
    } else {
      formData.append('roomMatrixFile', roomMatrixFile);
    }

    // Include students file if available for more accurate preview
    if (studentsFile) {
      formData.append('studentsFile', studentsFile);
      formData.append('allocationType', allocationType);
    }

    try {
      const response = await fetch('http://localhost:8080/api/seating/preview', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Enhanced preview data with dimensions
      setPreviewData({
        grid: data.preview,
        dimensions: data.dimensions || { rows: rows, columns: columns }, // Default to user input if not provided
      });

      // If preview includes unassigned students data
      if (data.unassignedStudents && data.unassignedStudents.length > 0) {
        setUnassignedStudents(data.unassignedStudents);
      } else {
        setUnassignedStudents([]);
      }

    } catch (err) {
      setError(`Preview Error: ${err.message}`);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentsFile) {
      setError('Please select a students Excel file');
      return;
    }

    if (!useManualConfig && !roomMatrixFile) {
      setError('Please select a room matrix Excel file or use manual configuration');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    setPdfUrl(null);
    setUnassignedStudents([]);

    const formData = new FormData();
    formData.append('studentsFile', studentsFile);
    formData.append('allocationType', allocationType);

    if (useManualConfig) {
      formData.append('manualConfig', 'true');
      formData.append('rows', rows);
      formData.append('columns', columns);
      formData.append('studentsPerSeat', studentsPerSeat);

      // Add a dummy roomMatrixFile for API validation if not provided
      if (!roomMatrixFile) {
        const blob = new Blob([""], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        formData.append('roomMatrixFile', blob, "dummy.xlsx");
      } else {
        formData.append('roomMatrixFile', roomMatrixFile);
      }
    } else {
      formData.append('roomMatrixFile', roomMatrixFile);
    }

    try {
      const response = await fetch('http://localhost:8080/api/seating/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      // Handle direct PDF download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      setSuccess('PDF Generated Successfully');

    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'seating_chart.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const downloadsTemplateFile = (templateType) => {
    // Using the correct path for public files
    const fileName = `${templateType}.xlsx`;

    // In a React app with correct setup, files in the public folder are accessible at the root
    // This assumes you've moved the files to the public folder
    fetch(`/assets/templates/${fileName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Template file not found');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(err => {
        setError(`Could not download template: ${err.message}`);
        console.error('Download error:', err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Background />

      <div className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl relative z-10 transition-all duration-500 ${isFirstRender ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700 mb-2">Exam Seating Chart Generator</h1>
          <p className="text-gray-600 text-sm">Upload your data, preview the layout, and generate seating charts</p>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {success && (
          <Alert
            type="success"
            message={success}
            action={
              <button
                onClick={downloadPdf}
                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-md text-sm flex items-center"
              >
                <Download className="h-4 w-4 mr-1" />
                Download PDF
              </button>
            }
            onClose={() => setSuccess(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Room Configuration Toggle */}
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={useManualConfig}
                onChange={() => setUseManualConfig(!useManualConfig)}
                className="form-checkbox text-blue-600 h-4 w-4 mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Use Manual Room Configuration</span>
            </label>
            <Settings className="h-5 w-5 text-blue-500" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Students File Upload */}
            <FileDropZone
              accept=".xlsx"
              onChange={handleStudentsFileChange}
              file={studentsFile}
              label="Student Data"
              placeholder="Upload students.xlsx"
              infoText="Must contain 'Roll No', 'Name', and 'Class' columns"
              onClear={() => clearFile('students')}
            />

            {/* Room Matrix File Upload OR Manual Configuration */}
            {!useManualConfig ? (
              <FileDropZone
                accept=".xlsx"
                onChange={handleRoomMatrixFileChange}
                file={roomMatrixFile}
                label="Room Layout Data"
                placeholder="Upload roomMatrix.xlsx"
                infoText="Must contain room dimensions and capacity details"
                onClear={() => clearFile('roomMatrix')}
              />
            ) : (
              <div className="border p-4 rounded-lg bg-gray-50">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Manual Room Configuration</h3>
                <div className="grid grid-cols-3 gap-3">
                  <InputField
                    label="Rows"
                    type="number"
                    value={rows}
                    onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="20"
                  />
                  <InputField
                    label="Columns"
                    type="number"
                    value={columns}
                    onChange={(e) => setColumns(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="20"
                  />
                  <InputField
                    label="Students/Seat"
                    type="number"
                    value={studentsPerSeat}
                    onChange={(e) => setStudentsPerSeat(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="5"
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Total capacity: {rows * columns * studentsPerSeat} students
                </div>
              </div>
            )}
          </div>

          {/* Template Downloads */}
          <div className="flex flex-wrap justify-center gap-3 pb-2 pt-1">
            <button
              type="button"
              onClick={() => downloadsTemplateFile('students')}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center transition-colors"
            >
              <Download className="h-4 w-4 mr-1" />
              Download Students Template
            </button>
            {!useManualConfig && (
              <button
                type="button"
                onClick={() => downloadsTemplateFile('roomMatrix')}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center transition-colors"
              >
                <Download className="h-4 w-4 mr-1" />
                Download Room Matrix Template
              </button>
            )}
          </div>
          {/* Allocation Type */}
          <div className="bg-gray-50 p-4 rounded-md">
            <label className="block text-gray-700 font-medium mb-2 text-sm">Seat Allocation Method</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="allocationType"
                  value="roll"
                  checked={allocationType === 'roll'}
                  onChange={() => setAllocationType('roll')}
                />
                <span className="ml-2 text-sm">By Roll Number</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="allocationType"
                  value="alphabetical"
                  checked={allocationType === 'alphabetical'}
                  onChange={() => setAllocationType('alphabetical')}
                />
                <span className="ml-2 text-sm">Alphabetically by Name</span>
              </label>
            </div>
          </div>

          {/* Preview Button */}
          <Button
            onClick={handlePreviewClick}
            disabled={previewLoading || (!roomMatrixFile && !useManualConfig)}
            loading={previewLoading}
            className="w-full"
          >
            <Eye className="h-5 w-5 mr-2" />
            Preview Seating Layout
          </Button>

          {/* Preview Grid Display */}
          {previewData && <PreviewGrid previewData={previewData} />}

          {/* Unassigned Students in Preview */}
          {previewData && unassignedStudents.length > 0 && (
            <div className="mt-4 border border-orange-200 rounded-md p-3 bg-orange-50 animate-fadeIn">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                <h3 className="text-sm font-semibold text-orange-700">
                  Warning: {unassignedStudents.length} Students Can't Be Accommodated
                </h3>
              </div>
              <div className="max-h-32 overflow-auto text-sm">
                <p className="text-orange-700 mb-2">The following students exceed available seating capacity:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  {unassignedStudents.map((student, index) => (
                    <li key={index} className="text-gray-700">
                      {student.name} (Roll: {student.rollNo}, Class: {student.class})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            primary
            disabled={loading || !studentsFile || (!roomMatrixFile && !useManualConfig)}
            loading={loading}
            className="w-full"
          >
            Generate Seating Chart PDF
          </Button>
        </form>

        {/* Example Format */}
        <div className="mt-8 border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Required Excel Formats</h3>
            <button
              onClick={() => {
                const section = document.getElementById('examples-section');
                section.classList.toggle('hidden');
              }}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Show/Hide Examples
            </button>
          </div>

          <div id="examples-section" className="hidden">
            <div className="mb-3">
              <h4 className="text-xs font-medium text-gray-600 mb-1">students.xlsx:</h4>
              <div className="bg-gray-50 p-3 rounded text-sm overflow-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 bg-gray-100">Roll No</th>
                      <th className="border px-4 py-2 bg-gray-100">Name</th>
                      <th className="border px-4 py-2 bg-gray-100">Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">12345</td>
                      <td className="border px-4 py-2">John Doe</td>
                      <td className="border px-4 py-2">Class 10A</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">67890</td>
                      <td className="border px-4 py-2">Jane Smith</td>
                      <td className="border px-4 py-2">Class 10B</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-medium text-gray-600 mb-1">roomMatrix.xlsx:</h4>
              <div className="bg-gray-50 p-3 rounded text-sm overflow-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 bg-gray-100">Room No</th>
                      <th className="border px-4 py-2 bg-gray-100">Rows</th>
                      <th className="border px-4 py-2 bg-gray-100">Columns</th>
                      <th className="border px-4 py-2 bg-gray-100">Total Capacity</th>
                      <th className="border px-4 py-2 bg-gray-100">Students per Seat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">101</td>
                      <td className="border px-4 py-2">5</td>
                      <td className="border px-4 py-2">5</td>
                      <td className="border px-4 py-2">25</td>
                      <td className="border px-4 py-2">1</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">102</td>
                      <td className="border px-4 py-2">6</td>
                      <td className="border px-4 py-2">8</td>
                      <td className="border px-4 py-2">48</td>
                      <td className="border px-4 py-2">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          Created by Your School • {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}