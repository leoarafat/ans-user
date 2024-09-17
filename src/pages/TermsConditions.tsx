import { Container, Grid, Typography, Link, Divider } from "@mui/material";

const TermsConditionsPage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Terms & Conditions
      </Typography>

      {/* <Typography variant="body1" gutterBottom>
        This Website (
        <Link
          href="https://ansmusiclimited.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ansmusiclimited.com/
        </Link>{" "}
        &amp;{" "}
        <Link
          href="https://ansbackstage.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          ansbackstage.com
        </Link>
        ) is offered to you by ANS Music (“Company”), by using our Website, you
        accept these terms in full that govern your use of the Website. If you
        disagree with these terms of use or any part of these terms, you must
        not use our Website. Any use of our digital Music Distribution Services
        is governed by the Content Licensing distribution Agreement and its
        relevant addendums, a digital copy is available{" "}
        <Link href="#" target="_blank" rel="noopener noreferrer">
          here
        </Link>
        .
      </Typography>

      <Divider style={{ margin: "20px 0" }} /> */}

      <Typography variant="body1" gutterBottom>
        <strong>1.</strong>
        <br />
        Only original content is allowed on our platform.
      </Typography>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="body1" gutterBottom>
        <strong>2.</strong>
        <br />
        ANS Music do not allow remixes, covers, or lo-fi content, unless you are
        the owner or hold 100% rights to the content.
      </Typography>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="body1" gutterBottom>
        <strong>3.</strong>
        <br />
        No political & Anti-Social content is allowed
      </Typography>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="body1" gutterBottom>
        <strong>4.</strong>
        <br />
        Any copyright infringement will lead to the suspension or termination of
        your ANS Music membership.
      </Typography>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="body1" gutterBottom>
        <strong>5.</strong>
        <br />
        For content uploaded on YouTube, if ANS Music finds that your content is
        being used by attaching it to popular songs, movies, or any other
        popular content which doesn't directly involve the content provided by
        you for Content ID, then ANS Music holds all rights to remove your
        content from platforms and our system. Additionally, any revenue
        generated from the content shall not be paid.
      </Typography>

      <Divider style={{ margin: "20px 0" }} />

      <Typography variant="body1" gutterBottom>
        <strong>
          By using ANS Music services, you agree to abide by these terms and
          conditions
        </strong>
      </Typography>
      <Divider style={{ margin: "20px 0" }} />
    </Container>
  );
};

export default TermsConditionsPage;
