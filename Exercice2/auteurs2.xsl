<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml"
    version="2.0">
    <xsl:param name="auteur" select="''"/>
    
    <xsl:output method="xml" 
        doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
        doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" 
        indent="yes"
        encoding="UTF-8"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Les auteurs avec leur livres</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"/>
            </head>
            <body>
                <div class ="container">
                    <h3>Liste des auteurs 
                        <xsl:choose>
                            <xsl:when test="$auteur = ''">
                                <span>(tous les auteurs)</span>
                            </xsl:when>
                            <xsl:otherwise>
                                <span>(<xsl:value-of select="$auteur"/>)</span>
                            </xsl:otherwise>
                        </xsl:choose>
                        avec leurs livres triés en ordre décroissant des prix
                    </h3>
                    <xsl:apply-templates select="bibliotheque"/>
                    
                </div>
                
                
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" type="text/javascript"></script>
            </body>
        </html>
    </xsl:template>
    
    <xsl:template match="bibliotheque">
        <table class="table table-success table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Adresse courreil</th>
                    <th scope="col">Commentaire</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Devise</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="livres/livre">
                    <xsl:sort select="prix" order="descending"/>
                    <xsl:call-template name="recherche_auteur">
                        <xsl:with-param name="ID" select="substring(@auteurs,1,3)"/>
                        <xsl:with-param name="titre" select="titre"/>
                        <xsl:with-param name="prix" select="prix"/>
                        <xsl:with-param name="devise" select="prix/@devise"/>
                    </xsl:call-template>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>
    
    <!-- Tepmlate qui recherche des auteurs avec un ID d'un livre et un nom passé en paramètre -->
    <xsl:template name="recherche_auteur">
        <xsl:param name="ID" select="YH1"/>
        <xsl:param name="titre" select="'21 lessons for the 21st century'"/>
        <xsl:param name="prix" select="23.55"/>
        <xsl:param name="devise" select="USD"/>
        <xsl:for-each select="/bibliotheque/auteurs/auteur">
            <xsl:choose>
                <xsl:when test="$auteur = ''">
                    <xsl:if test="@ident = $ID">
                        <tr>
                            <td><xsl:value-of select="nom"/></td>
                            <td><xsl:value-of select="prenom"/></td>
                            <td><xsl:value-of select="adresse"/></td>
                            <td>
                                <a>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="concat('mailto: ', email)"/>
                                    </xsl:attribute>
                                    <xsl:value-of select="email"/>
                                </a>
                            </td>
                            <td><xsl:value-of select="commentaire"/></td>
                            <td><xsl:value-of select="$titre"/></td>
                            <td><xsl:value-of select="$prix"/></td>
                            <td><xsl:value-of select="$devise"/></td>
                        </tr>
                    </xsl:if>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:if test="@ident = $ID and nom = $auteur">
                        <tr>
                            <td><xsl:value-of select="nom"/></td>
                            <td><xsl:value-of select="prenom"/></td>
                            <td><xsl:value-of select="adresse"/></td>
                            <td>
                                <a>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="concat('mailto: ', email)"/>
                                    </xsl:attribute>
                                    <xsl:value-of select="email"/>
                                </a>
                            </td>
                            <td><xsl:value-of select="commentaire"/></td>
                            <td><xsl:value-of select="$titre"/></td>
                            <td><xsl:value-of select="$prix"/></td>
                            <td><xsl:value-of select="$devise"/></td>
                        </tr>
                    </xsl:if>    
                </xsl:otherwise>
            </xsl:choose>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>



