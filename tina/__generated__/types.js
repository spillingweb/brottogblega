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
export const ServicesPartsFragmentDoc = gql`
    fragment ServicesParts on Services {
  __typename
  title
  category
  tagline
  image
  description
  offers {
    __typename
    title
    price
  }
  order
}
    `;
export const ArticlesPartsFragmentDoc = gql`
    fragment ArticlesParts on Articles {
  __typename
  title
  excerpt
  author
  date
  category
  readingTime
  coverImage
  body
}
    `;
export const EventsPartsFragmentDoc = gql`
    fragment EventsParts on Events {
  __typename
  title
  description
  image
  date
  endDate
  host
  time
  location
  spots
  tags
  price
}
    `;
export const EventCategoriesPartsFragmentDoc = gql`
    fragment EventCategoriesParts on EventCategories {
  __typename
  value
  label
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
export const ServicesDocument = gql`
    query services($relativePath: String!) {
  services(relativePath: $relativePath) {
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
    ...ServicesParts
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ServicesConnectionDocument = gql`
    query servicesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServicesFilter) {
  servicesConnection(
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
        ...ServicesParts
      }
    }
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ArticlesDocument = gql`
    query articles($relativePath: String!) {
  articles(relativePath: $relativePath) {
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
    ...ArticlesParts
  }
}
    ${ArticlesPartsFragmentDoc}`;
export const ArticlesConnectionDocument = gql`
    query articlesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ArticlesFilter) {
  articlesConnection(
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
        ...ArticlesParts
      }
    }
  }
}
    ${ArticlesPartsFragmentDoc}`;
export const EventsDocument = gql`
    query events($relativePath: String!) {
  events(relativePath: $relativePath) {
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
    ...EventsParts
  }
}
    ${EventsPartsFragmentDoc}`;
export const EventsConnectionDocument = gql`
    query eventsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EventsFilter) {
  eventsConnection(
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
        ...EventsParts
      }
    }
  }
}
    ${EventsPartsFragmentDoc}`;
export const EventCategoriesDocument = gql`
    query eventCategories($relativePath: String!) {
  eventCategories(relativePath: $relativePath) {
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
    ...EventCategoriesParts
  }
}
    ${EventCategoriesPartsFragmentDoc}`;
export const EventCategoriesConnectionDocument = gql`
    query eventCategoriesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EventCategoriesFilter) {
  eventCategoriesConnection(
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
        ...EventCategoriesParts
      }
    }
  }
}
    ${EventCategoriesPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    pages(variables, options) {
      return requester(PagesDocument, variables, options);
    },
    pagesConnection(variables, options) {
      return requester(PagesConnectionDocument, variables, options);
    },
    services(variables, options) {
      return requester(ServicesDocument, variables, options);
    },
    servicesConnection(variables, options) {
      return requester(ServicesConnectionDocument, variables, options);
    },
    articles(variables, options) {
      return requester(ArticlesDocument, variables, options);
    },
    articlesConnection(variables, options) {
      return requester(ArticlesConnectionDocument, variables, options);
    },
    events(variables, options) {
      return requester(EventsDocument, variables, options);
    },
    eventsConnection(variables, options) {
      return requester(EventsConnectionDocument, variables, options);
    },
    eventCategories(variables, options) {
      return requester(EventCategoriesDocument, variables, options);
    },
    eventCategoriesConnection(variables, options) {
      return requester(EventCategoriesConnectionDocument, variables, options);
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
