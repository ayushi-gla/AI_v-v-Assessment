"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { UploadedFilesList } from "@/components/uploaded-files-list"

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFilesUploaded = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Header */}
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">Upload Your Files</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Drop your PDF documents and audio files here. Our assistant will help you process them.
            </p>
          </div>

          {/* Upload Area */}
          <FileUploader onFilesUploaded={handleFilesUploaded} />

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && <UploadedFilesList files={uploadedFiles} onRemoveFile={handleRemoveFile} />}
        </div>
      </div>
    </div>
  )
}
