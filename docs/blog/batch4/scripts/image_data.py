# SteepWood Blog Batch 4 - per-post image subjects (alt text = subject line).
# Order of slots: hero, og, inline-01, inline-02, inline-wide.
# The hero subject is replaced at build time by the post's frontmatter hero.alt.
# env: workshop | home | site | commercial | outdoor | industrial
# region: key into REGION in build_image_pack.py (or None)

POSTS = {
"office-fitout-parramatta": ("commercial", "parramatta", "Parramatta", [
  "Office fitout in Parramatta with timber reception counter and open-plan workstations",
  "Oak veneer reception counter in a Parramatta office with city views",
  "Close detail of a veneer counter edge meeting a pale stone top",
  "Meeting room credenza with ventilated timber doors in a Parramatta office",
  "Finished Parramatta office breakout kitchenette with timber joinery and window light"]),
"kitchen-installation-lake-macquarie": ("home", "lake-macquarie", "Lake Macquarie", [
  "Kitchen installation in a Lake Macquarie home with timber island and lake light",
  "Newly installed cream kitchen cabinets in a Lake Macquarie home",
  "Close detail of a moisture-resistant cabinet carcass edge and soft-close hinge",
  "Tall pantry with internal drawers in a Lake Macquarie kitchen",
  "Completed Lake Macquarie kitchen with porcelain benchtop and water view beyond"]),
"shop-fitout-maitland": ("commercial", "hunter", "Maitland", [
  "Shop fitout in Maitland with timber display joinery in a heritage High Street shop",
  "Timber service counter in a Maitland heritage shopfront",
  "Close detail of adjustable timber shelving on brass brackets",
  "Lit display wall with timber shelves in a Maitland boutique",
  "Finished Maitland shop interior with pressed metal ceiling and timber joinery"]),
"deck-builders-lake-macquarie": ("outdoor", "lake-macquarie", "Lake Macquarie", [
  "Hardwood deck on a Lake Macquarie home overlooking the water at dusk",
  "Spotted Gum deck with wide timber steps down to a lakeside lawn",
  "Close detail of hardwood deck boards fixed with stainless steel screws",
  "Deck subframe with treated joists on stirrups above sloping ground",
  "Finished Lake Macquarie deck with outdoor dining and the lake beyond"]),
"restaurant-fitout-newcastle": ("commercial", "newcastle", "Newcastle", [
  "Restaurant fitout in Newcastle with timber bar counter and banquette seating",
  "Timber-fronted bar counter in a Newcastle restaurant before service",
  "Close detail of a hardwood bar top edge and brass foot rail",
  "Upholstered banquette with timber base and wall panelling in a restaurant",
  "Finished Newcastle restaurant dining room with warm lighting and timber joinery"]),
"home-office-joinery-north-shore-sydney": ("home", "sydney", "North Shore Sydney", [
  "Home office joinery in a North Shore Sydney home with built-in timber desk and bookshelves",
  "Built-in oak desk under a window in a North Shore study",
  "Close detail of a desk cable grommet and drawer front",
  "Floor-to-ceiling bookshelves with closed cupboards below in a Sydney study",
  "Finished North Shore home office with garden light across the desk"]),
"pharmacy-fitout-nsw": ("commercial", None, "Sydney", [
  "Pharmacy fitout in NSW with white dispensary joinery and timber front counter",
  "Timber-fronted pharmacy counter with a white laminate top",
  "Close detail of dispensary drawers with plain white fronts and metal pulls",
  "Pharmacy wall shelving with adjustable glass and timber shelves",
  "Finished NSW pharmacy interior with dispensary and consultation room door"]),
"warehouse-office-fitout-western-sydney": ("industrial", "western-sydney", "Western Sydney", [
  "Warehouse office fitout in Western Sydney with glazed mezzanine office above the warehouse floor",
  "Trade counter with laminate top at the entry of a Western Sydney warehouse office",
  "Close detail of compact laminate lunchroom benchtop edge",
  "Staff lockers and lunchroom joinery in a warehouse amenities area",
  "Finished warehouse office interior with timber joinery and view to the warehouse floor"]),
"kitchen-installation-maitland-hunter-valley": ("home", "hunter", "Maitland", [
  "Custom kitchen fitted by kitchen installers in a new Maitland home",
  "Kitchen island with timber end panel in a new Maitland estate home",
  "Hands adjusting a drawer front on a newly installed kitchen",
  "Butler's pantry with open shelves behind the main kitchen",
  "Completed Maitland kitchen with pale benchtop and pendant lights"]),
"childcare-centre-joinery-nsw": ("commercial", None, "Sydney", [
  "Childcare centre joinery in NSW with low timber storage cubbies in a bright playroom",
  "Children's bag cubbies with rounded edges and hooks in a childcare entry",
  "Close detail of a rounded timber edge on low childcare shelving",
  "Nappy change bench with pull-out steps and adult basin in a childcare centre",
  "Finished childcare playroom with low open shelving and natural light"]),
}
