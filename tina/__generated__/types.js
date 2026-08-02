export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PagesPartsFragmentDoc = gql`
    fragment PagesParts on Pages {
  __typename
  ... on PagesHomepage {
    pageName
    kicker
    titleMain
    titleItalic
    subtitle
    heroImage
    intro1Title
    intro1Text
    intro2Title
    intro2Text
    intro3Title
    intro3Text
    profileImage
    aboutTitle
    aboutText1
    aboutText2
    servicesHeading
    newsHeading
    ctaTitle
    ctaDescription
  }
  ... on PagesAbout {
    pageName
    title
    intro
    sharedImage
    sharedImageAlt
    sharedKicker
    sharedIntro
    sharedContent
    hildeImage
    hildeKicker
    hildeTitle
    hildeContent
    hildeKeywords {
      __typename
      keyword
    }
    tinaMariaImage
    tinaMariaKicker
    tinaMariaTitle
    tinaMariaContent
    tinaMariaKeywords {
      __typename
      keyword
    }
    valuesTitle
    value1Title
    value1Text
    value2Title
    value2Text
    value3Title
    value3Text
    ctaTitle
    ctaDescription
  }
  ... on PagesStandard {
    pageName
    title
    intro
    ctaTitle
    ctaDescription
  }
  ... on PagesKontakt {
    title
    kicker
    heading
    description
    addressLine1
    addressLine2
    addressLine3
    email
    phone
  }
}
    `;
export const PagesDocument = gql`
    query pages($relativePath: String!) {
  pages(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PagesParts
  }
}
    ${PagesPartsFragmentDoc}`;
export const PagesConnectionDocument = gql`
    query pagesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PagesFilter) {
  pagesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PagesParts
      }
    }
  }
}
    ${PagesPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    pages(variables, options) {
      return requester(PagesDocument, variables, options);
    },
    pagesConnection(variables, options) {
      return requester(PagesConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
