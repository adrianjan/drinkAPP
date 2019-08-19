<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
$metal: #292F36;
$mint: #F7FFF7;
$turq: #4ECDC4;
$red: #FF6B6B;

* {
    box-sizing: border-box;
}

#app {
    background: $metal;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $mint;
    display: flex;
    justify-content: center;
    align-items: space-around;
    width: 100%;
    min-height: 100vh;
}

.index {
    width: 100%;
}

.link {
    font-size: 18px;
    margin-top: 10px;
    color: $mint;
    &:focus,
    &:hover {
        color: $turq;
    }
}

.ul {
    width: 100%;
    list-style: none;
    padding: 0;
}

.h1 {
    font-size: 26px;
}

.alert {
    font-weight: bold;
    text-transform: uppercase;
    color: red;
}

.input {
    width: 60%;
    max-width: 400px;
    border: 2px solid $turq;
    padding: 5px;
    background: transparent;
    color: $mint;
    transition: border 0.3s ease-in;
    margin: 4px auto;
    &:focus {
        border-color: $mint;
    }

    &--radio {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: inline-block;
        position: relative;
        background: $mint;
        font-weight: bold;
        top: 10px;
        height: 25px;
        width: 25px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        margin-right: 3px;
        outline: none;
        &:hover {
            background: $red;
        }
        &:focus ~ label {
            font-weight: bold;
        }
        &:checked::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 60%;
            height: 60%;
            background: $turq;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.button {
    display: block;
    margin: 20px auto;
    box-shadow: none;
    border: none;
    padding: 10px 23px;
    font-size: 18px;
    cursor: pointer;
    position: relative;
    color: $metal;
    font-weight: bold;
    background: $mint;
    z-index: 1;
    overflow: hidden;
    &::before {
        position: absolute;
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: $turq;
        top: 0;
        right: 0;
        z-index: -1;
        transform: translate(50%, 50%);
        transition: transform 0.1s cubic-bezier(.17,.67,1,.48);
    }
    &:focus,
    &:hover {
        &::before {
            transform: scale(10, 3);
        }
        color: $mint;
    }
}

.label {
    cursor: pointer;
}

.small {
    font-size: 14px;
    font-weight: bold;
}

.select {
    margin-top: 20px;
    display: block;
    padding: 10px 0;
    font-weight: bold;
    color: $mint;
    width: 30%;
    max-width: 300px;
    min-width: 120px;
    background-color: $turq;
    box-shadow: none;
    &:hover {
        background: $mint;
        color: $turq;
    }
}
</style>
