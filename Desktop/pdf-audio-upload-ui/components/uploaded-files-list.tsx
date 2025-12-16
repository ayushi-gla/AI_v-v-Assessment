"use client"

import { FileText, Music, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface UploadedFilesListProps {
  files: File[]
  onRemoveFile: (index: number) => void
}

export function UploadedFilesList({ files, onRemoveFile }: UploadedFilesListProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") {
      return <FileText className="h-5 w-5 text-primary" />
    }
    if (file.type.startsWith("audio/")) {
      return <Music className="h-5 w-5 text-primary" />
    }
    return <FileText className="h-5 w-5 text-muted-foreground" />
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Uploaded Files ({files.length})</h2>
      </div>

      <div className="space-y-2">
        {files.map((file, index) => (
          <Card
            key={`${file.name}-${index}`}
            className={cn(
              "group relative overflow-hidden transition-all duration-200 hover:shadow-md",
              "animate-in fade-in slide-in-from-left-2",
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4 p-4">
              {/* File Icon */}
              <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3">{getFileIcon(file)}</div>

              {/* File Info */}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveFile(index)}
                className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>

            {/* Progress bar effect */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-primary/20">
              <div className="h-full w-full bg-primary animate-in slide-in-from-left duration-500" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
