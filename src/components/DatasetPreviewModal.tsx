"use client";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Download, X } from "lucide-react";
import { motion } from "framer-motion";

type DatasetCard = {
  id: string;
  title: string;
  description: string;
  institution: string;
  cancerType: string;
  modality: string;
  imageCount: number;
  downloadCount: number;
  publicationDate: string;
  size: string;
  license: string;
  tags: string[];
  citations: number;
};

type Props = {
  dataset: DatasetCard | null;
  onClose: () => void;
};

const hoverCard = {
  whileHover: { scale: 1.03, y: -2 },
  transition: { type: "spring", stiffness: 280, damping: 20 },
};

export const DatasetPreviewModal = ({ dataset, onClose }: Props) => {
  if (!dataset) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dataset-preview-title"
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-slate-700 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="bg-emerald-500 text-white hover:bg-emerald-300">
                {dataset.id}
              </Badge>
              <Badge
                variant="outline"
                className="border-white/20 bg-white/5 text-white"
              >
                {dataset.modality || "—"}
              </Badge>
              <Badge
                variant="outline"
                className="border-white/20 bg-white/5 text-white"
              >
                {dataset.cancerType || "—"}
              </Badge>
            </div>

            <h3
              id="dataset-preview-title"
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              {dataset.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/75 md:text-base">
              {dataset.description}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0 rounded-full text-white hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
          <motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="bg-white/5 p-5 rounded-2xl border border-white/10"
>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Dataset Information
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="bg-white/5 p-5 rounded-2xl border border-white/10"
>
                  <span className="block text-xs font-medium uppercase tracking-wide text-white/50">
                    Institution
                  </span>
                  <div className="mt-1 text-sm font-medium text-white">
                    {dataset.institution || "—"}
                  </div>
                </motion.div>

                <motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="bg-white/5 p-5 rounded-2xl border border-white/10"
>
                  <span className="block text-xs font-medium uppercase tracking-wide text-white/50">
                    License
                  </span>
                  <div className="mt-1 text-sm font-medium text-white">
                    {dataset.license || "—"}
                  </div>
                </motion.div>

                <motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="bg-white/5 p-5 rounded-2xl border border-white/10"
>
                  <span className="block text-xs font-medium uppercase tracking-wide text-white/50">
                    Publication Date
                  </span>
                  <div className="mt-1 text-sm font-medium text-white">
                    {dataset.publicationDate
                      ? new Date(dataset.publicationDate).toLocaleDateString()
                      : "—"}
                  </div>
                </motion.div>

                <motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="bg-white/5 p-5 rounded-2xl border border-white/10"
>
                  <span className="block text-xs font-medium uppercase tracking-wide text-white/50">
                    File Size
                  </span>
                  <div className="mt-1 text-sm font-medium text-white">
                    {dataset.size || "—"}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="bg-white/5 p-5 rounded-2xl border border-white/10"
>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Tags
              </h4>

              <div className="flex flex-wrap gap-2">
                {dataset.tags.length ? (
                  dataset.tags.map((tag) => (
                    <motion.div
                      key={tag}
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="will-change-transform"
                    >
                      <Badge
                        variant="outline"
                        className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))
                ) : (
                  <span className="text-sm text-white/60">No tags available</span>
                )}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
               whileHover={{ scale: 1.05 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm will-change-transform"
            >
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Stats
              </h4>

              <div className="grid grid-cols-1 gap-3">
                <motion.div
                 whileHover={{ scale: 1.05 }}
                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 will-change-transform"
                >
                  <div className="text-xs uppercase tracking-wide text-white/50">
                    Images
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    {dataset.imageCount.toLocaleString()}
                  </div>
                </motion.div>

                <motion.div
                 whileHover={{ scale: 1.05 }}
                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 will-change-transform"
                >
                  <div className="text-xs uppercase tracking-wide text-white/50">
                    Downloads
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    {dataset.downloadCount.toLocaleString()}
                  </div>
                </motion.div>

                <motion.div
                 whileHover={{ scale: 1.05 }}
                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 will-change-transform"
                >
                  <div className="text-xs uppercase tracking-wide text-white/50">
                    Citations
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    {dataset.citations.toLocaleString()}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
             whileHover={{ scale: 1.05 }}
             transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm will-change-transform"
            >
              <Button className="w-full rounded-xl bg-emerald-500 text-white hover:bg-emerald-600">
                <Download className="h-4 w-4 mr-2" />
                Download Dataset
              </Button>

              <Button
                variant="outline"
                className="mt-3 w-full rounded-xl border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                onClick={onClose}
              >
                Close Preview
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};