export class Note {
  constructor(
    public message: string,
    public paragraphId: number,
    public startCharacter: number,
    public endCharacter: number,
    public userId: number,
    public tags: string[]
  ) {}
}
