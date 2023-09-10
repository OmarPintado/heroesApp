import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Publisher} from "../../interfaces/hero.interface";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public publishers = [
    { id:'DC Comics', desc:'DC - Comics' },
    { id:'Marvel Comics', desc:'Marvel - Comics'}
  ]

  constructor(private heroesService:HeroesService) {}

  onSubmit():void{
    if(this.heroForm.invalid) return;

    this.heroesService.addHero()
  }

}
