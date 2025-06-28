import { mockedAuthorsList } from "../mocks/mocks";

export function getAuthorsWithNamesAndIds(authorIds: string[]): string {
  return authorIds
    .map((authorId) => {
      const author = mockedAuthorsList.find((a) => a.id === authorId);
      return author ? `${author.name}` : authorId;
    })
    .join(", ");
}
