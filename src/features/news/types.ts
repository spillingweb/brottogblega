import type { ArticlesConnectionQuery } from "../../../tina/__generated__/types";

export type ArticleNode = NonNullable<
  NonNullable<
    NonNullable<ArticlesConnectionQuery["articlesConnection"]["edges"]>[number]
  >["node"]
>;
