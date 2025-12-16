"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, FileText, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void
}

export function FileUploader({ onFilesUploaded }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const acceptedTypes = {
    "application/pdf": [".pdf"],
    "audio/mpeg": [".mp3"],
    "audio/wav": [".wav"],
    "audio/ogg": [".ogg"],
    "audio/mp4": [".m4a"],
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsUploading(true)

    const validFiles = Array.from(files).filter((file) => {
      const isPDF = file.type === "application/pdf"
      const isAudio = file.type.startsWith("audio/")
      return isPDF || isAudio
    })

    // Simulate upload delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (validFiles.length > 0) {
      onFilesUploaded(validFiles)
    }

    setIsUploading(false)
    setIsDragging(false)
  }

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      await processFiles(e.dataTransfer.files)
    },
    [onFilesUploaded],
  )

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      await processFiles(e.target.files)
      // Reset input value to allow re-uploading the same file
      e.target.value = ""
    },
    [onFilesUploaded],
  )

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border bg-card hover:border-primary/50 hover:bg-accent/50",
          isUploading && "pointer-events-none opacity-60",
        )}
      >
        <div className="flex flex-col items-center justify-center gap-6 px-6 py-16 md:py-20">
          <div
            className={cn(
              "rounded-2xl bg-primary/10 p-6 transition-all duration-200",
              isDragging && "scale-110 bg-primary/20",
            )}
          >
            <Upload
              className={cn("h-12 w-12 text-primary transition-all duration-200", isDragging && "animate-bounce")}
            />
          </div>

          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">{isDragging ? "Drop your files here" : "Drag & drop your files"}</h3>
            <p className="text-sm text-muted-foreground">or click the button below to browse</p>
          </div>

          {/* Supported File Types */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>PDF</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span>MP3, WAV, OGG, M4A</span>
            </div>
          </div>

          {/* Upload Button */}
          <label htmlFor="file-upload">
            <Button size="lg" className="cursor-pointer" disabled={isUploading} asChild>
              <span>
                {isUploading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Uploading...
                  </>
                ) : (
                  "Choose Files"
                )}
              </span>
            </Button>
          </label>

          <input
            id="file-upload"
            type="file"
            multiple
            accept={Object.keys(acceptedTypes).join(",")}
            onChange={handleFileInput}
            className="sr-only"
          />
        </div>
      </div>

      {/* Helper Text */}
      <p className="text-center text-xs text-muted-foreground">
        Maximum file size: 50MB per file • Multiple files supported
      </p>
    </div>
  )
}
