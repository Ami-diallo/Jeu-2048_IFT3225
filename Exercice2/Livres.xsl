<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/1999/xhtml"
    version="2.0">
    
    <!-- Paramètre de recherche : prix minimal -->
    <xsl:param name="prix_min" select="20.00"/>
    <!-- Paramètre de recherche : prix maximal -->
    <xsl:param name="prix_max" select="100.00"/>
    
    <xsl:output method="xml" 
        doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
        doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" 
        indent="yes"
        encoding="UTF-8"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Bibliothèque : livres selon le prix</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"/>
            </head>
            <body>
                <div class="container">
                    <h3>Liste des livres avec le prix entre <xsl:value-of select="$prix_min"/> 
                        et <xsl:value-of select="$prix_max"/>
                        triés en ordre croissant de nom des auteurs
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
                    <th scope="col">Titre</th>
                    <th scope="col">Langue</th>
                    <th scope="col">Année</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Devise</th>
                    <th scope="col">Couverture</th>
                    <th scope="col">Commentaire</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                </tr>
            </thead>
            <tbody>
                <xsl:for-each select="auteurs/auteur">
                    <xsl:sort select="nom" order="ascending"/>
                    <xsl:call-template name="recherche_livre">
                        <xsl:with-param name="ID" select="@ident"/>
                        <xsl:with-param name="nom_auteur" select="nom"/>
                        <xsl:with-param name="prenom_auteur" select="prenom"/>
                    </xsl:call-template>
                </xsl:for-each>
            </tbody>
        </table>
    </xsl:template>
    
    <!-- Tepmlate qui recherche des livres avec un ID d'un auteur et un prix dasn un intervalle spécifié -->
    <xsl:template name="recherche_livre">
        <xsl:param name="ID" select="YH1"/>
        <xsl:param name="nom_auteur" select="'Harari'"/>
        <xsl:param name="prenom_auteur" select="'Yyval Noah'"/>
        <xsl:for-each select="/bibliotheque/livres/livre">
            <xsl:if test="substring(@auteurs,1,3) = $ID and prix &gt; $prix_min and prix &lt; $prix_max">
                <tr>
                    <td><xsl:value-of select="titre"/></td>
                    <td><xsl:value-of select="@langue"/></td>
                    <td><xsl:value-of select="annee"/></td>
                    <td><xsl:value-of select="prix"/></td>
                    <td><xsl:value-of select="prix/@devise"/></td>
                    <td>
                        <a>
                            <xsl:attribute name="href">
                                <xsl:value-of select="couverture"/>
                            </xsl:attribute>
                            <xsl:value-of select="couverture"/>
                        </a>
                    </td>
                    <td><xsl:value-of select="commentaire"/></td>
                    <td><xsl:value-of select="$nom_auteur"/></td>
                    <td><xsl:value-of select="$prenom_auteur"/></td>
                </tr>
            </xsl:if>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>