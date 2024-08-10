import React from "react";
import { Image} from "semantic-ui-react";

const Form = ({ isSearching, videoUrlError, onChangeInput, onSearch }) => {
  return (
    <>
      <div class="section" id="main">
        <div class="container">
          <h1 id="logo">
            <a href="#">
              <Image src="img/logo.svg" alt="Namelix" width="112" height="24" />
            </a>
          </h1>
          <ul id="nav">
            <li>
              <a href="http://brandmark.io" target="_blank">
                by Brandmark.io
              </a>
            </li>
          </ul>
          <div id="intro">
            <h1>Business Name Generator</h1>
            <h2>
              generate a short, brandable business name using artificial
              intelligence
            </h2>

            {/* <SemanticForm>
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
                icon={<Icon name="youtube" />}
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
            </SemanticForm> */}
          </div>

          <div id="features">
            <div class="feature feature1">
              <Image src="/img/idea.svg" alt="idea" width="32" height="32" />
              <h3>Get name ideas</h3>
              <p>
                Namelix generates short, catchy names with a state of the art
                language model
              </p>
            </div>
            <div class="feature feature2">
              <Image src="img/funnel.svg" alt="funnel" width="32" height="32" />
              <h3>Filter results</h3>
              <p>
                Decide whether you prioritize a shorter name, having a specific
                keyword or domain extension
              </p>
            </div>
            <div class="feature feature3">
              <Image src="img/heart.svg" alt="heart" width="32" height="32" />
              <h3>Save your names</h3>
              <p>
                Our algorithm learns from the names you like, giving you better
                recommendations over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
