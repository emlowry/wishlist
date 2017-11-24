<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output indent="no" />

<xsl:template match="/wishlist">
<html>
  <head>
    <title class="wishlist-title">Elizabeth's Wishlist</title>
    <link rel="stylesheet" type="text/css" href="loader.css" />
	<script src="wishlist.js"></script>
  </head>
  <body onload="javascript:initialize();">
	<h1 class="loader">
	  <span>L</span>
	  <span>O</span>
	  <span>A</span>
	  <span>D</span>
	  <span>I</span>
	  <span>N</span>
	  <span>G</span>
	</h1>
    <div class="page" style="display: none;">
      <p class="name wishlist-title">Elizabeth's Wishlist</p>
      <p>Viewable only in CSS3-compatible browsers.</p>
      <ol class="sections">
        <xsl:apply-templates select="section" />
      </ol>
    </div>
  </body>
</html>
</xsl:template>

<xsl:template match="section">
<li>
  <p class="name"><xsl:value-of select="name" /></p>
  <xsl:for-each select="note">
  <p><xsl:copy-of select="node()" /></p>
  </xsl:for-each>
  <ol class="items">
  <xsl:for-each select="group | item">
  <li>
    <xsl:apply-templates select="." />
  </li>
  </xsl:for-each>
  </ol>
</li>
</xsl:template>

<xsl:template match="group">
  <span>
    <div class="number"><xsl:number count="group | item" /></div>
    <div class="content">
      <p class="name"><xsl:value-of select="name" /></p>
      <xsl:for-each select="note">
      <p><xsl:copy-of select="node()" /></p>
      </xsl:for-each>
      <ul class="subitems">
        <xsl:for-each select="item">
        <li>
          <a href="{url}">
            <div class="imagewrapper">
			  <div class="image">
                <img src="images/{thumbnail}" />
		      </div>
            </div>
            <p class="name"><xsl:value-of select="name" /></p>
            <xsl:for-each select="note">
            <p><xsl:copy-of select="node()" /></p>
            </xsl:for-each>
          </a>
        </li>
        </xsl:for-each>
      </ul>
    </div>
    <div class="clear"> </div>
  </span>
</xsl:template>

<xsl:template match="item">
  <a href="{url}">
    <div class="number"><xsl:number count="group | item" /></div>
	<div class="imagewrapper">
	  <div class="image">
        <img src="images/{thumbnail}" />
      </div>
	</div>
    <div class="content">
      <p class="name"><xsl:value-of select="name" /></p>
      <xsl:for-each select="note">
      <p><xsl:copy-of select="node()" /></p>
      </xsl:for-each>
    </div>
    <div class="clear"> </div>
  </a>
</xsl:template>

</xsl:stylesheet>