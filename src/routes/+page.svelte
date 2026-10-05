<script>
    import { onMount } from "svelte";
    import "./../lib/app.css";
    import IconButton from "../lib/micro/IconButton.svelte";
    import { OpenAlert, OpenComponentModal } from "../lib";
    import ModalManager from "../lib/modal/ModalManager.svelte";
    import { faHome } from "@fortawesome/free-solid-svg-icons";
    import PromptDialogManager from "#lib/prompt-dialog/PromptDialogManager.svelte";

    onMount(()=>{
        
    })
</script>
<PromptDialogManager></PromptDialogManager>
<ModalManager></ModalManager>
<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p class="text-2xl">Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<IconButton
    icon={faHome}
    text="Home"
    color="primary"
    onclick={()=>OpenAlert("hello")}
    >
</IconButton>