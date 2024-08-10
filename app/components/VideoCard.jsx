import React, { useState, useEffect } from "react";
import {
  Grid,
  Image,
  Icon,
  Dimmer,
  Card,
  Header,
  Button,
  Label,
  Progress,
  Modal,
} from "semantic-ui-react";

import { formatNumber, formatFileSize, formatMimeType } from "../utils";

const VideoCard = ({
  videoInfo,
  active,
  downloadingPercentage,
  onDownload,
}) => {
  const [dimmerActive, setDimmerActive] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [ads, setAds] = useState(false);

  console.log("downloadingPercentage", downloadingPercentage);

  const openDescriptionModal = () => setDescriptionModal(true);
  const closeDescriptionModal = () => setDescriptionModal(false);

  console.log("ads", ads);
  useEffect(() => {
    if (downloadingPercentage) {
      setAds(true);
    } else {
      setAds(false);
    }
  }, [downloadingPercentage]);

  return active ? (
    <div style={{ marginTop: "25px" }}>
      {/* ads models */}
      <Modal
        size="mini"
        dimmer="blurring"
        open={ads}
        onClose={() => setAds(false)}
      >
        {/* <ModalHeader>Use Google's location service?</ModalHeader> */}
        <Header>Ads</Header>
        <Modal.Content>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src="ads/ads2.png" alt="Namelix" height="450px" />
          </div>
        </Modal.Content>

        {/* <Button onClick={() => setAds(false)}>Close</Button> */}
      </Modal>
      <Grid verticalAlign="middle" stackable style={{ placeContent: "center" }}>
        <Grid.Column width={12}>
          <Card fluid>
            <Dimmer.Dimmable
              blurring={dimmerActive}
              onMouseEnter={() => setDimmerActive(true)}
              onMouseLeave={() => setDimmerActive(false)}
            >
              <Image
                alt={"video-thumbnail"}
                src={videoInfo.thumbnail}
                size="huge"
              />
              <Dimmer.Inner
                active={dimmerActive ? true : undefined}
                as="a"
                href={"https://www.youtube.com/watch?v=" + videoInfo.videoId}
                target="_blank"
              >
                <Icon name="youtube" color="red" size="huge" />
              </Dimmer.Inner>
            </Dimmer.Dimmable>
            <Card.Content>
              <div style={{ color: "#000" }}>{videoInfo.title}</div>
              {/* <Card.Meta style={{ paddingTop: "0.5em" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "fit-content",
                  }}
                >
                  <a target="_blank" href={videoInfo.author.user_url}>
                    <Image
                      avatar
                      size="large"
                      src={
                        videoInfo.author.thumbnails.length
                          ? videoInfo.author.thumbnails.slice(-1)[0].url
                          : "/not_found.jpg"
                      }
                    />
                  </a>
                  <div>
                    <Header size="tiny">
                      <Header.Content
                        as="a"
                        target="_blank"
                        href={videoInfo.author.user_url}
                      >
                        {videoInfo.author.name}{" "}
                        {videoInfo.author.verified ? (
                          <Icon name="check circle" />
                        ) : null}
                      </Header.Content>
                      <Header.Subheader
                        content={
                          formatNumber(videoInfo.author.subscriber_count) +
                          " subscribers"
                        }
                      />
                    </Header>
                  </div>
                </div>
              </Card.Meta> */}
            </Card.Content>
            <Card.Description>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  paddingBottom: "1em",
                }}
              >
                {videoInfo.formats.map((item, index) => (
                  <div
                    as="div"
                    labelPosition="left"
                    key={index}
                    data-tooltip={formatFileSize(item.contentLength)}
                    data-position="top right"
                    data-inverted
                  >
                    {/* <Label color="black" style={{ cursor: "auto" }}>
                      {item.qualityLabel || "Audio"}
                      {item.qualityLabel === "720p" ? <>hello</> : null}
                    </Label> */}

                    <Button
                      content={item.qualityLabel || "Audio"}
                      icon="download"
                      labelPosition="right"
                      disabled={downloadingPercentage !== null}
                      onClick={() =>
                        onDownload(
                          item.itag,
                          formatMimeType(item.mimeType),
                          item.qualityLabel || "Audio",
                          item.contentLength
                        )
                      }
                      loading={Boolean(item.isDownloading)}
                    />
                  </div>
                ))}
              </div>
              {downloadingPercentage !== null ? (
                <Progress
                  percent={downloadingPercentage}
                  progress
                  color="green"
                  style={{ margin: "1.5em" }}
                  size="medium"
                  success={downloadingPercentage === 100}
                >
                  {downloadingPercentage === 100
                    ? "Completed"
                    : "Downloading..."}
                </Progress>
              ) : null}
            </Card.Description>

            <Card.Content extra>
              <Grid columns={"equal"} textAlign="center" verticalAlign="middle">
                {/* <Grid.Column>
                  <b>
                    <Icon name="clock" /> {videoInfo.length}
                  </b>
                </Grid.Column> */}
                {/* <Grid.Column>
                  <Modal
                    trigger={
                      <Label
                        data-tooltip="Description"
                        as="a"
                        icon={<Icon name="file text" fitted />}
                        basic
                      />
                    }
                    open={descriptionModal}
                    onClose={closeDescriptionModal}
                    onOpen={openDescriptionModal}
                  >
                    <Header>Description</Header>
                    <Modal.Content style={{ whiteSpace: "pre-line" }}>
                      {videoInfo.shortDescription}
                      <br />
                      <br />
                      {videoInfo.keywords && videoInfo.keywords.length ? (
                        <Label.Group>
                          {videoInfo.keywords.map((keyword, index) => {
                            return (
                              <Label key={index}>
                                <Icon name="hashtag" /> {keyword}
                              </Label>
                            );
                          })}
                        </Label.Group>
                      ) : null}
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        onClick={closeDescriptionModal}
                        icon
                        labelPosition="right"
                      >
                        <Icon name="remove" /> Close
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Grid.Column> */}
                {/* <Grid.Column>
                  <b>
                    <Icon name="eye" /> {videoInfo.viewCount}
                  </b>
                </Grid.Column> */}
              </Grid>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  ) : null;
};

export default VideoCard;
