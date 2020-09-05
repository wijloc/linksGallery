<template>
  <v-container>
    <v-app-bar dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Link's Gallery</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title
              v-on:click="
                () => {
                  showIncluir = !showIncluir;
                  if (showIncluir) this.incluir_ocultar = 'Ocultar';
                  else this.incluir_ocultar = 'Incluir';
                }
              "
              >{{ this.incluir_ocultar }}</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title
              v-on:click="
                () => {
                  this.collection = 'media';
                  this.getItems();
                }
              "
              >Media</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title
              v-on:click="
                () => {
                  this.collection = 'content';
                  this.getItems();
                }
              "
              >Content</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-row>
      <v-img
        :src="this.currentLink"
        v-on:click.native="playPauseGalleryTranstition"
        max-height="795"
        aspect-ratio="0.5"
        contain
      ></v-img>
    </v-row>
    <v-row class="text-center">
      <v-col cols="4" offset="4">
        <v-row>
          <v-col cols="3">
            <v-btn
              depressed
              small
              color="primary"
              :href="this.currentLink"
              target="_blank"
              >Foto</v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn
              depressed
              small
              color="primary"
              v-on:click="playPauseGalleryTranstition"
              >{{ this.interval ? "Pause" : "Play" }}</v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn
              depressed
              small
              color="primary"
              :href="this.currentSource"
              target="_blank"
              >Origem</v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn depressed small color="primary" v-on:click="nextPic"
              >Próxima</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="4" offset="4">
        <v-slider
          v-model="slider"
          class="align-center"
          max="10000"
          min="500"
          :disabled="!!this.interval"
          hide-details
        >
        </v-slider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" offset="4">
        <v-alert
          v-model="incluido"
          outlined
          type="info"
          dismissible
          border="left"
          elevation="2"
          dense
        >
          {{ this.mensagem }}
        </v-alert>
      </v-col>
    </v-row>
    <span v-if="showIncluir">
      <v-row class="text-center">
        <v-col cols="10" offset="1">
          <v-text-field
            label="Imagem"
            outlined
            v-model="link"
            v-on:keyup.enter="addItem"
          ></v-text-field>
          <v-text-field
            label="Origem"
            outlined
            v-model="source"
            v-on:keyup.enter="addItem"
          ></v-text-field>
          <v-btn depressed small color="primary" v-on:click="addItem"
            >Incluir</v-btn
          >
        </v-col>
      </v-row>
    </span>

    <span v-for="item in items" v-bind:key="item._id">
      <v-row class="text-center">
        <v-img
          :src="item.link"
          max-height="795"
          aspect-ratio="0.5"
          contain
        ></v-img>
      </v-row>
      <v-row class="text-center">
        <v-col cols="1" offset="4">
          <v-btn
            depressed
            small
            color="primary"
            :href="item.link"
            target="_blank"
            >Foto</v-btn
          >
        </v-col>
        <v-col cols="1" offset="2">
          <v-btn
            depressed
            small
            color="primary"
            :href="item.source"
            target="_blank"
            >Origem</v-btn
          >
        </v-col>
      </v-row>
    </span>
  </v-container>
</template>

<script>
import GalleryService from "@/services/GalleryService";

export default {
  name: "items",
  data() {
    return {
      items: [],
      incluido: false,
      mensagem: "",
      showIncluir: false,
      incluir_ocultar: "Incluir",
      link: "",
      source: "",
      title: "Home",
      currentLink: "",
      currentSource: "",
      currentLinkCounter: 0,
      slider: 1500,
      interval: null,
      collection: "media"
    };
  },
  head: {
    // To use "this" in the component, it is necessary to return the object through a function
    title: function() {
      return {
        inner: this.title
      };
    }
  },
  methods: {
    async getItems() {
      const response = await GalleryService.fetchItems(this.collection);
      this.items = response.data.reverse();
      this.currentLink = this.items[0].link;
      this.currentLinkCounter = 0;
    },
    async addItem() {
      this.incluido = false;
      const response = await GalleryService.addItem(
        this.link,
        this.source,
        this.collection
      );
      this.mensagem = response.data;
      this.incluido = true;
      this.link = "";
      this.getItems();
    },
    nextPic() {
      if (this.currentLinkCounter >= this.items.length) {
        this.currentLinkCounter = 0;
      }
      this.currentSource = this.items[this.currentLinkCounter].source;
      this.currentLink = this.items[this.currentLinkCounter].link;
      this.currentLinkCounter++;
    },
    animateGallery() {
      this.interval = setInterval(() => this.nextPic(), this.slider);
    },
    playPauseGalleryTranstition() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      } else {
        this.animateGallery();
      }
    }
  },
  created() {
    this.getItems();
    this.animateGallery();
  }
};
</script>
