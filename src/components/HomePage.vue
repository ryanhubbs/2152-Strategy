<template>
  <h1>2152 SMASH Scouting</h1>
  <img :src="absoluteLogoPath" alt="Cannot load logo file" class="center" width="300" height="75">
  <h2>Scouting Forms</h2>
  <ul v-if="list.length > 0" class="link-list">
    <li v-for="[i, name] of list.entries()" :key="i">
      <RouterLink :to="{ name: 'form', query: { name } }">{{ name }}</RouterLink>
    </li>
  </ul>
  <p v-else>No configurations specified.</p>
  <h2>Tools</h2>
  <ul class="link-list">
    <li>
      <RouterLink :to="{ name: 'inspector' }">Data Inspector</RouterLink>
    </li>
    <li>
      <a href="https://docs.google.com/document/d/1-HgbNw-TdRhQ4DJKG9C3BOcHSc-WlC92WXWyaqcHNgc/edit?usp=sharing">Scouting Guide</a>
    </li>
  </ul>
  <br>
  <br>
  <footer>
    <h5>Version 1.3.0</h5>
  </footer>
</template>

<script setup lang="ts">
// Fetch logo path
const absoluteLogoPath = $computed(() => `${import.meta.env.BASE_URL}assets/home_icon.png`);

// Fetch configurations list
const fetchResult = await fetch(`${import.meta.env.BASE_URL}assets/configurations.txt`);

if (!fetchResult.ok)
  throw new Error(`Configuration list fetch failed: HTTP ${fetchResult.status} (${fetchResult.statusText})`);

// Get text data, then convert to array
const textData = await fetchResult.text();
const list = $ref(textData.split("\n").map(value => value.trim()).filter(value => value.length > 0));
</script>

<style>
.custom-href {
  a:link { text-decoration: none; }
  a:visited { text-decoration: none; }
  a:hover { text-decoration: none; }
  a:active { text-decoration: none; }
}
.link-list {
  margin: 0;

  li {
    margin: 6px 0;
  }
}
hr-foot {
    border: 0;
    height: 1px;
}
</style>
