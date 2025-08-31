import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    standalone: false,
	selector: 'app-news-modal',
	template: `
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ article.title }}</ion-title>
				<ion-buttons slot="end">
					<ion-button (click)="dismiss()">
						<ion-icon name="close"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<img *ngIf="article.urlToImage" [src]="article.urlToImage" alt="imagen noticia" style="width:100%;max-height:200px;object-fit:cover;margin-bottom:16px;" />
			<h2>{{ article.title }}</h2>
			<p>{{ article.description }}</p>
			<div style="margin-top: 2em; text-align: center;">
				<ion-button color="primary" [href]="article.url" target="_blank">
					<ion-icon name="open-outline" slot="end"></ion-icon>
					Read full article
				</ion-button>
			</div>
		</ion-content>
	`,
	styles: [`
		ion-content { font-size: 1.05em; }
		h2 { font-size: 1.2em; margin-bottom: 0.5em; }
		p { color: #444; }
	`]
})
export class NewsModalComponent {
	@Input() article: any;
	constructor(private modalCtrl: ModalController) {}
	dismiss() { this.modalCtrl.dismiss(); }
}
