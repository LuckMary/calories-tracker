import { useState } from "preact/hooks";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Alert,
  Stack,
} from "@mui/material";

function Recognition() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [recognizedText, setRecognizedText] = useState<string>("");

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setSelectedFile(target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploadStatus("Uploading...");
      setRecognizedText("");
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus("File processed successfully!");
        setRecognizedText(data.text || "No text recognized");
      } else {
        setUploadStatus("Upload failed");
      }
    } catch (error) {
      setUploadStatus("Error during upload");
      console.error("Upload error:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        File Recognition
      </Typography>

      <Stack spacing={3} sx={{ mb: 4 }}>
        <TextField
          type="file"
          onChange={handleFileChange}
          inputProps={{ accept: "image/*" }}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedFile}
          sx={{ alignSelf: "flex-start" }}
        >
          Upload
        </Button>
      </Stack>

      {uploadStatus && (
        <Alert
          severity={uploadStatus.includes("success") ? "success" : "error"}
          sx={{ mb: 2 }}
        >
          {uploadStatus}
        </Alert>
      )}

      {recognizedText && (
        <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Recognized Text:
          </Typography>
          <Typography component="pre" sx={{ whiteSpace: "pre-wrap" }}>
            {recognizedText}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default Recognition;
