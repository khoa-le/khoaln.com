import {graphql} from 'gatsby'

export const bannerImage = graphql`
  fragment bannerImage260 on File {
    childImageSharp {
      gatsbyImageData(
        width: 260
        placeholder: BLURRED
        formats: [AUTO, WEBP, AVIF]
        quality: 50
      )
    }
  }
  fragment bannerImage640 on File {
    childImageSharp {
      gatsbyImageData(
        width: 640
        placeholder: BLURRED
        formats: [AUTO, WEBP, AVIF]
      )
    }
  }
  fragment bannerImage720 on File {
    childImageSharp {
      gatsbyImageData(
        width: 720
        placeholder: BLURRED
        formats: [AUTO, WEBP, AVIF]
        quality: 75
      )
    }
  }
`
