import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { RestaurantService } from "../restaurant/restaurant.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("items")
@UseGuards(AuthGuard)
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly restaurantService: RestaurantService,
  ) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    const restaurant = await this.restaurantService.findOne(createItemDto.restaurantId);
    if (!restaurant) throw new BadRequestException("Restaurant not exist");

    return this.itemService.create(createItemDto);
  }

  @Get()
  async findAll() {
    return this.itemService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const item = await this.itemService.findOne(id);
    if (!item) throw new NotFoundException();
    return this.itemService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() updateItemDto: UpdateItemDto) {
    const item = await this.itemService.findOne(id);
    if (!item) throw new NotFoundException();
    if (updateItemDto.restaurantId) {
      const restaurant = await this.restaurantService.findOne(updateItemDto.restaurantId);
      if (!restaurant) throw new BadRequestException("Restaurant not exist");
    }

    return this.itemService.update(id, updateItemDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    // Confirm the entity exist before deleting
    const item = await this.itemService.findOne(id);
    if (!item) throw new NotFoundException();

    return this.itemService.remove(id);
  }
}
