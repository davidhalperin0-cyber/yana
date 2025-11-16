import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

// Import videos
import video1 from "@/video/1.mp4";
import video2 from "@/video/2.mp4";
import video3 from "@/video/3.mp4";
import video4 from "@/video/4.mp4";
import video5 from "@/video/5.mp4";
import video6 from "@/video/6.mp4";

const videos = [
  { id: 1, src: video1, title: "סרטון 1" },
  { id: 2, src: video2, title: "סרטון 2" },
  { id: 3, src: video3, title: "סרטון 3" },
  { id: 4, src: video4, title: "סרטון 4" },
  { id: 5, src: video5, title: "סרטון 5" },
  { id: 6, src: video6, title: "סרטון 6" },
];

interface CoursePageProps {
  onBackToHome?: () => void;
}

export const CoursePage = ({ onBackToHome }: CoursePageProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = videos[currentVideoIndex];

  // Reset video when changing videos
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
    }
  }, [currentVideoIndex]);

  const handleVideoEnd = () => {
    setWatchedVideos((prev) => new Set([...prev, currentVideo.id]));
    setIsPlaying(false);
  };

  const goToNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setIsPlaying(false);
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentVideoIndex > 0) {
      setIsPlaying(false);
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const selectVideo = (index: number) => {
    setIsPlaying(false);
    setCurrentVideoIndex(index);
  };

  return (
    <section className="min-h-screen py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Back Button */}
          {onBackToHome && (
            <div className="mb-6 flex justify-start">
              <Button
                onClick={onBackToHome}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                חזרה לעמוד הראשי
              </Button>
            </div>
          )}
          <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full mb-4" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            קורס מזורז לאירועי שטח
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            כל מה שצריך לדעת כדי להפוך שטח פתוח לחתונה הכי מיוחדת שראיתם
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-luxury"
            >
              <h2 className="text-2xl font-bold mb-4">רשימת הסרטונים</h2>
              <div className="space-y-2">
                {videos.map((video, index) => (
                  <motion.button
                    key={video.id}
                    onClick={() => selectVideo(index)}
                    className={`w-full text-right p-4 rounded-lg transition-all ${
                      currentVideoIndex === index
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-background/50 hover:bg-background border border-border"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {watchedVideos.has(video.id) && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        )}
                        <span className="font-medium">{video.title}</span>
                      </div>
                      <Play className="w-4 h-4" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Video Player */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-luxury"
            >
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  src={currentVideo.src}
                  className="w-full h-full object-contain"
                  onEnded={handleVideoEnd}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{currentVideo.title}</h3>
                <div className="text-sm text-muted-foreground">
                  {currentVideoIndex + 1} / {videos.length}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4">
                <Button
                  onClick={goToPrevious}
                  disabled={currentVideoIndex === 0}
                  variant="outline"
                  className="flex-1"
                >
                  <ChevronRight className="w-4 h-4 ml-2" />
                  הקודם
                </Button>
                <Button
                  onClick={goToNext}
                  disabled={currentVideoIndex === videos.length - 1}
                  variant="outline"
                  className="flex-1"
                >
                  הבא
                  <ChevronLeft className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

