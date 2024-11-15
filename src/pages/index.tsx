import React, { useState, useRef, useEffect, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Box,
  Container,
  TextField,
  Typography,
  Link,
  Grid,
  Paper,
  MobileStepper,
  IconButton,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import PoolProductGrid from "@/containers/PoolProductGrid";
import TestimonialsSection from "@/containers/Testimonials";
import Footer from "@/containers/Footer";

const StyledVideo = styled("video")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "1/1",
  height: 300,
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  "&:hover .overlay": {
    transform: "translateY(0)",
  },
  "&:hover img": {
    transform: "scale(1.05)",
  },
}));

const StyledImage = styled(Image)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
}));

const HoverOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  padding: theme.spacing(2),
  transform: "translateY(100%)",
  transition: "transform 0.3s ease-in-out",
  zIndex: 2,
}));

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);

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

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    videos.forEach((_, index) => {
      const videoElement = videoRefs[index].current;
      if (videoElement) {
        if (index === activeStep) {
          videoElement.play();
        } else {
          videoElement.pause();
          videoElement.currentTime = 0;
        }
      }
    });
  }, [activeStep]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Video Carousel Section */}
      <Box sx={{ position: "relative", width: "100%", mb: 2 }}>
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            backgroundColor: "background.paper",
            overflow: "hidden",
          }}
        >
          <SwipeableViews
            axis="x"
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {videos.map((video, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "100vw",
                  height: "100vh",
                  // 16:9 aspect ratio
                }}
              >
                <StyledVideo ref={videoRefs[index]} playsInline muted loop>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </StyledVideo>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "white",
                    padding: 2,
                  }}
                >
                  <Typography variant="h6">Welcome to Pure Life</Typography>
                </Box>
              </Box>
            ))}
          </SwipeableViews>

          {/* <MobileStepper
              steps={videos.length}
              position="static"
              activeStep={activeStep}
              sx={{
                bgcolor: "transparent",
                position: "absolute",
                bottom: 0,
                width: "100%",
              }}
              nextButton={
                <IconButton
                  onClick={handleNext}
                  disabled={activeStep === videos.length - 1}
                  sx={{ color: "white" }}
                >
                  <KeyboardArrowRight />
                </IconButton>
              }
              backButton={
                <IconButton
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{ color: "white" }}
                >
                  <KeyboardArrowLeft />
                </IconButton>
              }
            /> */}
        </Paper>
      </Box>

      {/* Photo Gallery Section */}
      <Grid container spacing={2} sx={{ px: 2 }}>
        {stockPhotos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ImageWrapper>
              <StyledImage
                src={photo}
                alt={`Stock photo ${index + 1}`}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw"
                priority={index < 2}
                style={{ objectFit: "cover" }}
              />
              <ImageOverlay>
                <Typography
                  color="white"
                  variant="h6"
                  align="center"
                  sx={{
                    fontWeight: 600,
                    textDecoration: "underline",
                    textUnderlineOffset: 10,
                    px: 2,
                  }}
                >
                  Pools
                </Typography>
              </ImageOverlay>
              <HoverOverlay className="overlay">
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Description Title
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </HoverOverlay>
            </ImageWrapper>
          </Grid>
        ))}
      </Grid>

      <Box p={15}>
        <Stack alignItems="center" direction="row" mb={3}>
          <Box
            sx={{
              backgroundColor: "black",
              width: 100,
              borderBottomColor: "black",
              height: 2,
              borderWidth: 2,
              mr: 2,
            }}
          />
          <Typography sx={{ color: "#133240" }} fontWeight="bold" variant="h6">
            OPERATING SINCE 1980
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="flex-end">
          <Typography
            fontWeight="bold"
            fontSize={65}
            sx={{ width: 2000, color: "#133240" }}
          >
            Specializing in pools, pavers, ponds and hardscaping.
          </Typography>
          <Typography color="textSecondary" fontWeight="500">
            We help you create your dream space at your home while ensuring high
            quality work.
          </Typography>
        </Stack>
        <Box
          mt={5}
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-end"
          width="100%"
        >
          <Button
            variant="contained"
            disableElevation
            disableRipple
            sx={{
              borderRadius: 20,
              textTransform: "none",
              backgroundColor: "#133240",
            }}
          >
            Hire Us
          </Button>
        </Box>
      </Box>

      <Box display="flex" alignItems="center">
        <Box>{/* Map */}</Box>
        {/* Our Company  and Gallery Blocks*/}
        <Box>
          <Stack>
            <Box>{/* Our Company */}</Box>
            <Box>{/* Gallery */}</Box>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ p: 10, px: 15, backgroundColor: "#FAFAFA" }}>
        {/* Products Section */}
        <Box display="flex" alignItems="center">
          <Typography
            component="span"
            sx={{ pr: 1, fontWeight: "600", fontSize: 30, color: "#5C83D6" }}
          >
            Fiber Glass Pools
          </Typography>
          <Typography
            component="span"
            sx={{ fontWeight: "600", fontSize: 30, color: "#133240" }}
          >
            from our suppliers
          </Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2" sx={{ color: "#585858", width: 600 }}>
            Have questions about pricing, products or service? Fill out the form
            and our friendly team can bet back to you within 24 hours.
          </Typography>

          <Button
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "white",
              borderColor: "#133240",
              textTransform: "none",
              color: "#133240",
            }}
          >
            See More Fiber Glass Pools
          </Button>
        </Stack> 
        
       <PoolProductGrid />
      </Box>

      <Box sx={{ position: "relative", width: "100%" }}>
        {/* Customer Feedback Section */}
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="customer feedback background"
          src="/assets/images/CustomerFeedbackBackground.png"
        />
        <TestimonialsSection />
      </Box>

      <Footer />
      <Box>{/* Footer */}</Box>
    </Box>
  );
};

export default Home;
