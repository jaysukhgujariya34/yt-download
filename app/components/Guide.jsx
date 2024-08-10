import React from "react";
import { Image } from "semantic-ui-react";
import { Grid, Segment } from "semantic-ui-react";

export const Guide = () => {
  return (
    <>
      <h2 style={{ fontSize: "35px", fontWeight: "bold", color: "#363a8e" }}>
        How to download YouTube videos?
      </h2>

      <Grid.Row>
        <Grid.Column computer={4} tablet={8} mobile={16}>
          <Image
            src="ss/screen1.jpg"
            alt="Namelix"
            height="50%"
            style={{ borderRadius: "15px" }}
          />
        </Grid.Column>

        <Grid.Column computer={4} tablet={8} mobile={16}>
          <Image
            src="ss/screen2.jpg"
            alt="Namelix"
            height="50%"
            style={{ borderRadius: "15px" }}
          />
        </Grid.Column>

        <Grid.Column computer={4} tablet={8} mobile={16}>
          <Image
            src="ss/screen3.jpg"
            alt="Namelix"
            height="50%"
            style={{ borderRadius: "15px" }}
          />
        </Grid.Column>
      </Grid.Row>
    </>
  );
};
