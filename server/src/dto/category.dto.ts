import { IsString } from "class-validator";

class CreateCategoryDto {
  @IsString()
  public title: string;

  @IsString()
  public imageUrl: string;
}

export default CreateCategoryDto;
