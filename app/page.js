"use client";

import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { loadFull } from "tsparticles";
import JsFileDownloader from "js-file-downloader";
const ytdl = require("ytdl-core");

import { formatTime, formatNumber } from "./utils";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";
import VideoCard from "./components/VideoCard";
import Loader from "./components/Loader";
import {
  Image,
  Icon,
  Form as SemanticForm,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
} from "semantic-ui-react";
import { Guide } from "./components/Guide";

const Page = () => {
  const [isParticleLoading, setIsParticleLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoUrlError, setVideoUrlError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [downloadingPercentage, setDownloadingPercentage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const stripYoutubeId = (url) => {
    url = url.split(
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
    );
    return url.length > 1 ? url[1] : "";
  };

  const validateYoutubeUrlId = () => {
    if (!videoUrl) {
      setVideoUrlError(true);
      return false;
    }
    let videoId = stripYoutubeId(videoUrl);

    if (!ytdl.validateID(videoId)) {
      setVideoUrlError(true);
      return false;
    }
    setVideoUrlError(false);
    return true;
  };

  const onChangeInput = (value) => {
    setVideoUrl(value);
    if (videoUrlError) {
      validateYoutubeUrlId();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAds(false);
    }, 15000);
    return () => clearTimeout(timeout);
  }, [ads]);

  const onSearch = async () => {
    let videoUrlIdValid = validateYoutubeUrlId();
    if (!videoUrlIdValid) {
      return;
    }

    let videoId = stripYoutubeId(videoUrl);
    setIsSearching(true);
    setErrorMessage(null);
    setAds(true);

    try {
      const res = await fetch("/api/getInfo", {
        method: "POST",
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();

      if (data.success) {
        setVideoInfo({
          ...data.details,
          thumbnail: data.details.thumbnail.thumbnails.length
            ? data.details.thumbnail.thumbnails.slice(-1)[0].url
            : "/not_found.jpg",
          length: data.details.lengthSeconds
            ? formatTime(data.details.lengthSeconds)
            : null,
          viewCount: data.details.viewCount
            ? formatNumber(data.details.viewCount)
            : null,
          formats: data.formats.map((item) => ({
            ...item,
            isDownloading: false,
          })),
        });
      } else {
        setErrorMessage(data.error);
        setVideoInfo(null);
      }
    } catch (err) {
      setErrorMessage("Internal server error, please try again later.");
      console.error(err);
      setVideoInfo(null);
    } finally {
      setIsSearching(false);
      setDownloadingPercentage(null);
    }
  };

  const onDownload = async (itag, mimeType, quality, contentLength) => {
    setVideoInfo({
      ...videoInfo,
      formats: videoInfo.formats.map((item) => ({
        ...item,
        isDownloading: item.itag === itag,
      })),
    });

    setErrorMessage(null);
    setDownloadingPercentage(0);

    const fileName = `${quality}-${videoInfo.title}.${
      mimeType.includes("audio") ? "m4a" : "mp4"
    }`;

    try {
      const download = new JsFileDownloader({
        url: "api/download",
        method: "POST",
        body: JSON.stringify({
          itag,
          videoId: videoInfo.videoId,
        }),
        filename: fileName,
        contentTypeDetermination: "full",
        autoStart: false,
        forceDesktopMode: true,
        process: (event) => {
          var downloadingPercentage = Math.floor(
            (event.loaded / contentLength) * 100
          );
          setDownloadingPercentage(downloadingPercentage);
        },
      });

      await download.start();
      setDownloadingPercentage(100);
      setTimeout(() => setDownloadingPercentage(null), 2000);
    } catch (err) {
      if (err.request.status === 429) {
        setErrorMessage(
          "Too many downloads in a short time. Please wait 10 seconds and try again."
        );
      } else {
        setErrorMessage(
          "Error occurred while downloading video. Please try again later."
        );
      }
    } finally {
      setVideoInfo({
        ...videoInfo,
        formats: videoInfo.formats.map((item) => ({
          ...item,
          isDownloading: false,
        })),
      });
    }
  };

  return (
    <>
      <Modal
        size="mini"
        dimmer="blurring"
        open={ads}
        onClose={() => setAds(false)}
      >
        <ModalHeader>Use Google's location service?</ModalHeader>
        <ModalContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src="ads/ads2.png" alt="Namelix" height="450px" />
          </div>
        </ModalContent>

        {/* <Button onClick={() => setAds(false)}>Close</Button> */}
      </Modal>
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Grid verticalAlign="middle" textAlign="center" stackable>
          <div class="section" id="main">
            <div class="container">
              <h1 id="logo">
                <a href="#">
                  <Image
                    src="images/logo.svg"
                    alt="Namelix"
                    width="112"
                    height="24"
                  />
                </a>
              </h1>
              <ul id="nav">
                <li>
                  <a
                    href="https://www.linkedin.com/in/jaysukhgujariya"
                    target="_blank"
                  >
                    by Jaysukh gujariya
                    <img
                      src="img/arrow_right.svg"
                      alt=""
                      width="24"
                      height="16"
                    />
                  </a>
                </li>
              </ul>

              <div id="intro">
                <h1>Youtube video Download 4k, 8k</h1>
                <h2>
                  generate a short, brandable business name using artificial
                  intelligence
                </h2>

                <SemanticForm>
                  <SemanticForm.Input
                    fluid
                    placeholder="Video URL or ID"
                    autoFocus
                    disabled={isSearching}
                    action={{
                      icon: "search",
                      color: "red",
                      content: "Search",
                      labelPosition: "right",
                      size: "small",
                      loading: isSearching,
                      onClick: onSearch,
                    }}
                    onChange={(event, { value }) => onChangeInput(value)}
                    maxLength={255}
                    icon={<Icon name="linkify" />}
                    iconPosition="left"
                    error={
                      videoUrlError
                        ? {
                            content: "Invalid URL/ID.",
                            pointing: "below",
                          }
                        : null
                    }
                  />
                </SemanticForm>
                <ErrorMessage
                  errorMessage={errorMessage}
                  active={Boolean(errorMessage)}
                />
                <VideoCard
                  videoInfo={videoInfo}
                  active={Boolean(videoInfo)}
                  downloadingPercentage={downloadingPercentage}
                  onDownload={onDownload}
                />
                <div className="dis">
                  <h2>The best YouTube Video Downloader</h2>
                  <h2 style={{ fontSize: "17px" }}>
                    YT Download YouTube Downloader helps you download any
                    YouTube video in the best quality.
                    <br /> Download YouTube videos in MP3 and MP4 many more
                    formats. Our downloader is for free and does not require any
                    software or registration.
                  </h2>
                </div>
              </div>

              <div id="features">
                <div class="feature feature1">
                  <Image
                    src="/images/idea.svg"
                    alt="idea"
                    width="32"
                    height="32"
                  />
                  <h3>Free download</h3>
                  <p>
                    Convert and download YouTube videos as much as you want
                    without limitation and always free.
                  </p>
                </div>
                <div class="feature feature2">
                  <Image
                    src="images/funnel.svg"
                    alt="funnel"
                    width="32"
                    height="32"
                  />
                  <h3>Fast and easy to use</h3>
                  <p>
                    Just paste the link or type in the search box to get ready
                    to download.
                  </p>
                </div>
                <div class="feature feature3">
                  <Image
                    src="images/heart.svg"
                    alt="heart"
                    width="32"
                    height="32"
                  />
                  <h3>Best to download</h3>
                  <p>
                    The conversion and download speed is extremely fast. You do
                    not need to wait long to get the MP3 or MP4 files.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Guide />

          <Footer />
        </Grid>
      </div>
    </>
  );
};

export default Page;
