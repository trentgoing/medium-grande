export class TextSnippet {
  constructor(
    public content: string,
    public paragraphId: number,
    public startCharacter: number,
    public endCharacter: number,
    public mouse: Array<number>
  ) {}
}
