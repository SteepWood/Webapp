# SteepWood Blog Batch 3 - per-post image subjects (alt text = subject line).
# Order of slots: hero, og, inline-01, inline-02, inline-wide.
# env: workshop | home | site | commercial | outdoor
# region: key into REGION in build_image_pack.py (or None)

POSTS = {
"office-fitout-newcastle-guide": ("commercial", "newcastle", "Newcastle", [
  "Office fitout in Newcastle with timber reception counter and open-plan workstations",
  "Timber-fronted reception counter in a bright Newcastle office fitout",
  "Close detail of veneer reception counter edge and brushed brass trim",
  "Office storage wall with oak veneer doors beside a meeting room in Newcastle",
  "Finished Newcastle office with breakout kitchenette and harbour light through windows"]),
"kitchen-installation-cost-nsw": ("site", None, "Newcastle", [
  "Kitchen installation in a NSW home with base cabinets levelled before benchtops",
  "Newly installed white kitchen cabinets awaiting a stone benchtop",
  "Hands adjusting a soft-close hinge on a newly installed kitchen door",
  "Installer's level resting on fixed base cabinets in a NSW kitchen",
  "Completed custom kitchen in a NSW home with porcelain benchtop and timber island"]),
"shop-fitout-newcastle-guide": ("commercial", "newcastle", "Newcastle", [
  "Shop fitout in Newcastle with timber display walls and a feature service counter",
  "Boutique shop counter with fluted timber front in a Newcastle store",
  "Close detail of adjustable timber retail shelving and brass brackets",
  "Retail display wall with lit shelves in a Newcastle street-front shop",
  "Finished Newcastle boutique with display joinery and polished concrete floor"]),
"decking-cost-newcastle": ("outdoor", "newcastle", "Newcastle", [
  "Hardwood deck built on the rear of a Newcastle brick home",
  "Freshly oiled Spotted Gum deck with timber steps in Newcastle",
  "Close detail of hardwood decking boards and stainless steel screws",
  "Deck subframe with treated joists and stirrups before boards are laid",
  "Finished Newcastle deck with outdoor setting and garden beyond in afternoon light"]),
"home-office-joinery-newcastle": ("home", "newcastle", "Newcastle", [
  "Home office joinery in a Newcastle home with built-in desk and shelving wall",
  "Built-in timber desk with overhead shelves in a Newcastle study",
  "Close detail of desk grommet and cable tray under a built-in desk",
  "File drawers and closed cupboards beneath a built-in home office desk",
  "Finished Newcastle home office with window light across a timber desk"]),
"commercial-joinery-newcastle-guide": ("workshop", "newcastle", "Newcastle", [
  "Commercial joinery being assembled in a Newcastle joinery workshop",
  "Reception counter carcass on sawhorses in a Newcastle joinery workshop",
  "Close detail of edge-banded laminate panel on a workshop bench",
  "Stacked commercial cabinet carcasses wrapped for delivery",
  "Finished commercial joinery installed in a Newcastle office kitchenette"]),
"office-fitout-central-coast-guide": ("commercial", "central-coast", "Gosford", [
  "Office fitout on the Central Coast with light timber joinery and coastal light",
  "Reception desk in a Gosford office fitout with timber batten wall",
  "Close detail of laminate workstation top and timber edge",
  "Meeting room credenza with oak doors in a Central Coast office",
  "Finished Central Coast office with breakout area and kitchenette joinery"]),
"kitchen-installation-newcastle": ("site", "newcastle", "Newcastle", [
  "Kitchen installation in a Newcastle home with cabinets fixed before benchtop templating",
  "Island cabinets installed in a Newcastle renovation",
  "Hands fitting a drawer onto soft-close runners in a new kitchen",
  "Tall pantry and oven tower cabinets installed in a Newcastle kitchen",
  "Completed Newcastle kitchen with timber island and pale benchtop"]),
"composite-vs-timber-decking-central-coast": ("outdoor", "central-coast", "Gosford", [
  "Composite and hardwood decking on a Central Coast home overlooking bushland",
  "Composite deck boards beside a hardwood deck on the Central Coast",
  "Close detail of composite deck board grain and hidden clip fixing",
  "Close detail of oiled hardwood deck boards in coastal light",
  "Finished Central Coast deck with outdoor dining and bush views"]),
"shop-fitout-central-coast": ("commercial", "central-coast", "Erina", [
  "Shop fitout on the Central Coast with timber display joinery and service counter",
  "Light timber service counter in an Erina boutique",
  "Close detail of display shelf joint and concealed LED strip",
  "Wall display joinery with adjustable shelves in a Central Coast shop",
  "Finished Central Coast boutique with coastal palette and timber displays"]),
"cafe-fitout-cost-nsw": ("commercial", None, "Newcastle", [
  "Cafe fitout in NSW with timber servery counter and back bar shelving",
  "Timber cafe counter with display cabinet space",
  "Close detail of compact laminate servery top and timber front",
  "Back bar shelving with ceramic cups in a NSW cafe",
  "Finished NSW cafe with banquette seating and warm timber joinery"]),
"built-in-desk-study-nook-sydney": ("home", "sydney", "Sydney", [
  "Built-in desk and study nook in a Sydney apartment living area",
  "Compact study nook with shelves in a Sydney terrace",
  "Close detail of slim desk drawer and timber pull",
  "Study nook with pocket doors partly open in a Sydney home",
  "Finished Sydney study nook with soft afternoon light"]),
"kitchen-installation-central-coast": ("site", "central-coast", "Gosford", [
  "Kitchen installers on the Central Coast fitting white shaker cabinets in a coastal home",
  "Shaker cabinets installed in a Central Coast coastal kitchen",
  "Close detail of moisture-resistant sink cabinet with sealed edges",
  "Overhead cabinets installed beneath a raked ceiling on the Central Coast",
  "Completed Central Coast kitchen with white shaker doors and timber benchtop"]),
"office-fitout-timeline-nsw": ("commercial", None, "Sydney", [
  "Office fitout in progress in NSW with joinery installed before final finishes",
  "Office floor mid-fitout with new joinery and protected floor",
  "Close detail of joinery shop drawing at an oblique angle so no writing is legible",
  "Wrapped joinery modules ready for installation in an office",
  "Completed NSW office fitout ready for move-in"]),
"retail-shop-fitout-sydney": ("commercial", "sydney", "Sydney", [
  "Retail shop fitout in Sydney with timber display walls and compact service counter",
  "Compact service counter in a narrow Sydney shop",
  "Close detail of veneer display plinth and black steel frame",
  "Display wall with lit niches in a Sydney retail tenancy",
  "Finished Sydney boutique with timber displays and warm lighting"]),
"deck-builders-sydney-cost": ("outdoor", "sydney", "Sydney", [
  "Hardwood deck built on a sloping Sydney block with bushland behind",
  "Elevated timber deck on a Sydney home",
  "Close detail of Blackbutt deck boards and stainless fixings",
  "Deck stairs and balustrade on a sloping Sydney site",
  "Finished Sydney deck with outdoor lounge in afternoon light"]),
"medical-clinic-fitout-joinery-nsw": ("commercial", None, "Newcastle", [
  "Medical clinic fitout joinery in NSW with reception counter and clean consult room cabinetry",
  "Clinic reception counter with lowered accessible section",
  "Close detail of compact laminate benchtop and handwash basin in a consult room",
  "Consult room cabinetry with closed storage and sink",
  "Finished NSW medical clinic waiting area with timber joinery"]),
"commercial-joinery-sydney-builders": ("workshop", None, "Sydney", [
  "Commercial joinery modules prepared in a workshop for a Sydney fitout",
  "Large joinery modules loaded for delivery to a Sydney site",
  "Close detail of joinery label area and edge banding seen at an angle with no legible writing",
  "Commercial cabinets installed on a Sydney fitout site",
  "Finished Sydney office with installed commercial joinery"]),
"kitchen-installation-sydney": ("site", "sydney", "Sydney", [
  "Kitchen installation in a Sydney terrace with new cabinets along a narrow galley",
  "Galley kitchen cabinets installed in a Sydney terrace",
  "Close detail of scribed panel against an uneven wall",
  "Integrated appliance cabinet installed in a Sydney apartment kitchen",
  "Completed Sydney terrace kitchen with skylight light"]),
"home-office-joinery-central-coast": ("home", "central-coast", "Gosford", [
  "Home office joinery on the Central Coast with built-in desk and coastal views",
  "Light timber built-in desk in a Central Coast home",
  "Close detail of desk shelf and woven basket storage",
  "Built-in shelving and cupboards in a Central Coast study",
  "Finished Central Coast home office with natural light"]),
"office-kitchenette-breakout-joinery": ("commercial", None, "Newcastle", [
  "Office kitchenette and breakout joinery with timber cabinets and compact laminate benchtop",
  "Office kitchenette with integrated dishwasher and tall storage",
  "Close detail of compact laminate benchtop edge beside a sink",
  "Breakout bench seating with storage below in an office",
  "Finished office breakout area with kitchenette and warm timber"]),
"shop-counter-display-joinery": ("commercial", None, "Newcastle", [
  "Shop counter and display joinery with fluted timber front and lit shelving",
  "Curved shop counter with timber front",
  "Close detail of counter top edge and timber fluting",
  "Lockable glass display cabinet beside a shop counter",
  "Finished shop interior with counter and display wall"]),
"spotted-gum-merbau-blackbutt-decking-nsw": ("workshop", None, "Newcastle", [
  "Spotted Gum, Merbau and Blackbutt decking boards laid on a workshop bench for comparison",
  "Three hardwood decking boards fanned out on a timber bench",
  "Close detail of Spotted Gum decking grain",
  "Close detail of Blackbutt and Merbau decking board ends",
  "Finished hardwood deck in NSW with oiled boards in afternoon light"]),
"salon-barber-shop-fitout-nsw": ("commercial", None, "Maitland", [
  "Barber shop fitout in NSW with timber barber stations, mirrors and retail shelving",
  "Row of barber stations with mirrors and timber fronts",
  "Close detail of barber station bench with tool holster and drawer",
  "Retail product wall with timber shelves in a barber shop",
  "Finished NSW barber shop interior with warm timber and black steel"]),
"kitchen-installation-process-day-by-day": ("site", None, "Newcastle", [
  "Kitchen installation in progress with base cabinets fixed and benchtop template being prepared",
  "Base cabinets levelled on adjustable legs during installation",
  "Hands checking level on a base cabinet during kitchen installation",
  "Thin benchtop template strips laid on newly installed cabinets",
  "Completed kitchen with benchtop, splashback and appliances fitted"]),
"compact-laminate-commercial-joinery": ("commercial", None, "Newcastle", [
  "Compact laminate benchtop with dark core edge in a commercial staff kitchen",
  "Compact laminate panels stacked in a joinery workshop",
  "Close detail of compact laminate edge showing solid dark core",
  "Compact laminate vanity top with undermount basin in a commercial bathroom",
  "Finished staff kitchen with compact laminate benchtop and timber cabinets"]),
"home-office-built-ins-hybrid-work-nsw": ("home", None, "Newcastle", [
  "Home office built ins with timber desk, open shelving and closed storage in a NSW home",
  "Wall of home office built ins with desk and shelves",
  "Close detail of styled open shelves behind a desk",
  "Fold-away desk nook with doors partly closed",
  "Finished NSW home office with soft window light on the desk"]),
"office-fitout-sydney-small-business": ("commercial", "sydney", "Sydney", [
  "Small office fitout in Sydney with timber reception counter, workstations and storage wall",
  "Compact reception counter in a small Sydney office",
  "Close detail of storage wall door and recessed pull",
  "Small office kitchenette with timber cabinets in Sydney",
  "Finished small Sydney office with workstations and city light"]),
"commercial-joinery-central-coast": ("commercial", "central-coast", "Gosford", [
  "Commercial joinery on the Central Coast with timber reception counter in a Gosford office",
  "Timber reception counter in a Gosford office",
  "Close detail of veneer panel join on a commercial counter",
  "Medical consult cabinetry in a Central Coast clinic",
  "Finished Central Coast office with installed commercial joinery"]),
"christmas-shutdown-fitout-planning-nsw": ("commercial", None, "Newcastle", [
  "Empty office during Christmas shutdown with new joinery being installed",
  "Quiet office with protected floors and new reception joinery",
  "Close detail of wrapped joinery panel leaning against a wall",
  "New kitchenette cabinets installed in an empty office",
  "Finished office ready to reopen after the holiday break"]),
}
