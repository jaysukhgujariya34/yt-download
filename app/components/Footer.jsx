import Link from "next/link";
import React, { Component } from "react";
import { Image } from "semantic-ui-react";

export default class Footer extends Component {
  render() {
    return (
      <div class="section" id="main">
        <div class="container">
          <div
            style={{
              padding: "10px 0px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              src="images/logo.svg"
              alt="Namelix"
              width="112"
              height="45"
            />
            <div>
              <Link href="/" className="footer_link">
                About
              </Link>
              <Link href="/" className="footer_link">
                Contact
              </Link>
              <Link href="/" className="footer_link">
                Terms of Service
              </Link>
              <Link href="/" className="footer_link">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
