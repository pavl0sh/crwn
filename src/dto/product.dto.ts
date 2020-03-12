import { IsString, IsNumber } from "class-validator";

class CreateProductDto {
  @IsString()
  public name: string;

  @IsString()
  public imageUrl: string;

  @IsNumber()
  public price: number;
}

export default CreateProductDto;
