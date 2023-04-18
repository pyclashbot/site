import React, { Component } from "react";
import Head from "next/head";
import { initializeGA } from "../GoogleAnalytics";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      keywords: this.props.keywords,
      canonicalUrl: this.props.url,
    };
    initializeGA();
  }

  render() {
    return (
      <Head>
        <title>{this.state.title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={this.state.description} />
        <meta name="keywords" content={this.state.keywords} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={this.state.title} />
        <meta property="og:description" content={this.state.description} />
        <meta property="og:site_name" content={this.state.title} />
        <meta name="theme-color" content="#181d20" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="twitter:card" content={this.state.description} />
        <meta property="twitter:title" content={this.state.title} />
        <meta property="twitter:description" content={this.state.description} />
        <meta httpEquiv="Cache-Control" content="max-age=86400" />
        <meta httpEquiv="Permissions-Policy" content="interest-cohort=()" />
        <meta
          name="google-site-verification"
          content="Fimwu5S-RkDYvpJD2yVaGoZYT8ticA_v_V285-5AFqg"
        />
        <link rel="canonical" href={this.state.canonicalUrl} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
    );
  }
}
