import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videos = [
    "/assets/videos/placeholder/pool_woman.mp4",
    "/assets/videos/placeholder/pool_woman.mp4",
    "/assets/videos/placeholder/pool_woman.mp4",
    "/assets/videos/placeholder/pool_woman.mp4",
  ];

  const stockPhotos = [
    "https://picsum.photos/200/",
    "https://picsum.photos/200/",
    "https://picsum.photos/200/",
    "https://picsum.photos/200/",
  ];

  const videoRefs = Array(videos.length)
    .fill(null)
    .map(() => useRef(null));

  useEffect(() => {
    videos.forEach((_, index) => {
      const videoElement = videoRefs[index].current;
      if (videoElement) {
        if (index === currentIndex) {
          videoElement.play();
        } else {
          videoElement.pause();
          videoElement.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Video Carousel Section */}
      <section className="w-full">
        <Carousel
          activeIndex={currentIndex}
          onSelect={handleSelect}
          controls={false}
          indicators={true}
          interval={null}
        >
          {videos.map((video, index) => (
            <Carousel.Item key={index}>
              <div className="aspect-video w-full relative">
                <video
                  ref={videoRefs[index]}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  loop
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <Carousel.Caption>
                <h3>Video {index + 1}</h3>
                <p>Video description goes here.</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Photo Gallery Section */}
      <section className="w-full mt-4">
        <div className="grid grid-cols-4 gap-4 px-4">
          {stockPhotos.map((photo, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={photo}
                alt={`Stock photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority={index < 2}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
